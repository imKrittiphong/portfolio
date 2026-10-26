import { useEffect, useRef } from "react";
import * as THREE from "three";

const AMBER = new THREE.Color("#f59e0b");
const AMBER_LIGHT = new THREE.Color("#fcd34d");
const LINES = 24;
const POINTS = 900;
const SECTIONS = ["#about", "#skill", "#project", "#contact"];

const smooth = (a: number, b: number, x: number) => {
  const k = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return k * k * (3 - 2 * k);
};

// Waypoints in page px: a wave across the hero, then an S down the side
// margins, switching sides only in the gaps between sections.
function buildPath(W: number) {
  const pageY = (el: Element) => el.getBoundingClientRect().top + scrollY;
  const hero = document.querySelector("#top");
  const sections = SECTIONS.map((s) => document.querySelector(s)).filter(Boolean) as Element[];
  if (!hero || !sections.length) return null;

  const heroTop = pageY(hero);
  const heroBottom = heroTop + hero.clientHeight;
  const heroMid = (heroTop + heroBottom) / 2;
  const contentHalf = Math.min(448, W / 2 - 16);
  const margin = Math.max((W / 2 - contentHalf) / 2, W * 0.06);
  const side = (right: boolean) => (right ? W - margin : margin);

  const pts = [
    new THREE.Vector3(-0.15 * W, heroMid + 40, 0),
    new THREE.Vector3(0.25 * W, heroMid - 50, 0),
    new THREE.Vector3(0.55 * W, heroMid + 20, 0),
    new THREE.Vector3(side(true), heroBottom - 40, 0),
  ];
  let right = true;
  sections.forEach((sec, i) => {
    const top = pageY(sec);
    const bottom = top + sec.clientHeight;
    pts.push(new THREE.Vector3(side(right), (top + bottom) / 2, 0));
    const next = sections[i + 1];
    const gap = next ? (bottom + pageY(next)) / 2 : bottom + 60;
    if (next) {
      // longer run-up = rounder bend; capped so short sections don't fold the curve
      const nextMid = pageY(next) + next.clientHeight / 2;
      const bend = Math.min(260, (gap - (top + bottom) / 2) * 0.6, (nextMid - gap) * 0.6);
      pts.push(new THREE.Vector3(side(right), gap - bend, 0));
      pts.push(new THREE.Vector3(W / 2, gap, 0));
      right = !right;
      pts.push(new THREE.Vector3(side(right), gap + bend, 0));
    } else {
      pts.push(new THREE.Vector3(W / 2, document.documentElement.scrollHeight + 80, 0));
    }
  });
  return { curve: new THREE.CatmullRomCurve3(pts, false, "centripetal"), heroBottom };
}

export default function FlowLines() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    // 1 world unit = 1 CSS px, world y = -page y
    const camera = new THREE.OrthographicCamera(0, 1, 0, -1, -10, 10);

    const lines = Array.from({ length: LINES }, (_, i) => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(POINTS * 3), 3));
      geo.setAttribute("color", new THREE.BufferAttribute(new Float32Array(POINTS * 4), 4));
      const mat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true });
      const line = new THREE.Line(geo, mat);
      line.frustumCulled = false;
      scene.add(line);
      const center = 1 - Math.abs(i / (LINES - 1) - 0.5) * 2;
      return { geo, mat, i, center, color: AMBER.clone().lerp(AMBER_LIGHT, center) };
    });

    let path: ReturnType<typeof buildPath> = null;
    let samples: { p: THREE.Vector3; n: THREE.Vector2; s: number }[] = [];
    let W = 0;
    const layout = () => {
      W = innerWidth;
      const H = innerHeight;
      renderer.setSize(W, H);
      camera.right = W;
      camera.bottom = -H;
      camera.updateProjectionMatrix();
      path = buildPath(W);
      if (!path) return;
      const len = path.curve.getLength();
      samples = Array.from({ length: POINTS }, (_, k) => {
        const u = k / (POINTS - 1);
        const p = path!.curve.getPointAt(u);
        const tan = path!.curve.getTangentAt(u);
        return { p, n: new THREE.Vector2(-tan.y, tan.x), s: u * len };
      });
    };
    const ro = new ResizeObserver(layout);
    ro.observe(document.body);
    layout();

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = () => (W < 1024 ? 0.6 : 1);
    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!path) return;
      const t = reduced ? 0 : clock.getElapsedTime();
      const dim = narrow();
      for (const { geo, i, center, color } of lines) {
        const pos = geo.attributes.position as THREE.BufferAttribute;
        const col = geo.attributes.color as THREE.BufferAttribute;
        const base = (i / (LINES - 1) - 0.5) * 2;
        for (let k = 0; k < POINTS; k++) {
          const { p, n, s } = samples[k];
          // wide, bright ribbon in the hero; slim and faint down the page
          const inHero = 1 - smooth(path.heroBottom - 200, path.heroBottom + 200, p.y);
          const width = 22 + 48 * inHero;
          const off =
            width * (base * Math.cos(s * 0.004 + t * 0.4 + i * 0.05) + Math.sin(s * 0.012 - t * 0.8 + i * 0.15) * 0.6) +
            Math.sin(s * 0.03 + t * 1.2) * 6;
          pos.setXYZ(k, p.x + n.x * off, -(p.y + n.y * off), 0);
          const fadeEnds = smooth(0, 0.04, k / POINTS) * (1 - smooth(0.94, 1, k / POINTS));
          const alpha = (0.12 + center * 0.5) * (0.3 + 0.7 * inHero) * fadeEnds * dim;
          col.setXYZW(k, color.r, color.g, color.b, alpha);
        }
        pos.needsUpdate = col.needsUpdate = true;
      }
      camera.position.y = -scrollY;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      lines.forEach(({ geo, mat }) => (geo.dispose(), mat.dispose()));
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
