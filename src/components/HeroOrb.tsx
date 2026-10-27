import { useEffect, useRef } from "react";
import * as THREE from "three";

const COUNT = 9000;
const CAMERA_Z = 5;

// Ashima 3D simplex noise (MIT) — drives the orb's slow, liquid surface.
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform float uHover;
uniform float uSize;
uniform vec2 uMouse;
attribute float aRand;
varying float vMix;
varying float vDepth;
${NOISE}
void main() {
  vec3 n = normalize(position);
  float t = uTime * 0.22;
  float d = snoise(n * 1.4 + vec3(t, t * 0.6, -t)) + snoise(n * 3.6 - t * 1.4) * 0.3;
  float disp = d * (0.16 + uScroll * 0.5);
  vec4 mv = modelViewMatrix * vec4(n * (1.0 + disp), 1.0);

  // points near the cursor are pushed outward, like a magnet repelling filings
  vec2 toMouse = mv.xy - uMouse;
  float push = exp(-dot(toMouse, toMouse) * 3.0) * uHover;
  mv.xy += normalize(toMouse + 1e-4) * push * 0.35;

  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.55 + aRand * 0.9) * (1.0 + push * 1.5) / -mv.z;
  vMix = clamp(disp * 2.6 + 0.15 + push, 0.0, 1.0);
  vDepth = smoothstep(${(-CAMERA_Z - 1.6).toFixed(1)}, ${(-CAMERA_Z + 1.2).toFixed(1)}, mv.z);
}`;

const fragmentShader = /* glsl */ `
uniform vec3 uGold;
uniform vec3 uEmber;
uniform float uOpacity;
varying float vMix;
varying float vDepth;
void main() {
  float r = length(gl_PointCoord - 0.5);
  if (r > 0.5) discard;
  float a = smoothstep(0.5, 0.05, r) * mix(0.18, 1.0, vDepth) * uOpacity;
  gl_FragColor = vec4(mix(uGold, uEmber, vMix), a);
}`;

const PALETTE = {
  light: { gold: "#c98c00", ember: "#e2500a", ring: "#0e0d0b", opacity: 0.85 },
  dark: { gold: "#f4bf2a", ember: "#ff7a2b", ring: "#f4bf2a", opacity: 0.9 },
};

function fibonacciSphere(count: number) {
  const pos = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    pos.set([Math.cos(th) * r, y, Math.sin(th) * r], i * 3);
    rand[i] = Math.random();
  }
  return { pos, rand };
}

function ring(radius: number, segments = 256) {
  const pts = Array.from({ length: segments }, (_, i) => {
    const a = (i / segments) * Math.PI * 2;
    return new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius);
  });
  return new THREE.BufferGeometry().setFromPoints(pts);
}

/**
 * Golden particle orb for the hero: ~9k points on a sphere, displaced by
 * simplex noise, repelled by the cursor, and loosened as you scroll away.
 * Two thin orbit rings with a travelling bead give it a watch-dial feel.
 */
export default function HeroOrb({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const dpr = Math.min(devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.z = CAMERA_Z;

    const rig = new THREE.Group();
    const orb = new THREE.Group();
    rig.add(orb);
    scene.add(rig);

    const { pos, rand } = fibonacciSphere(COUNT);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    const uniforms = {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uHover: { value: 0 },
      uSize: { value: 13 * dpr },
      uMouse: { value: new THREE.Vector2(9, 9) },
      uGold: { value: new THREE.Color() },
      uEmber: { value: new THREE.Color() },
      uOpacity: { value: 1 },
    };
    const mat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });
    orb.add(new THREE.Points(geo, mat));

    const ringMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.28 });
    const ringA = new THREE.LineLoop(ring(1.55), ringMat);
    const ringB = new THREE.LineLoop(ring(1.85), ringMat);
    ringA.rotation.set(1.2, 0, 0.35);
    ringB.rotation.set(1.35, 0, -0.5);
    const beadGeo = new THREE.SphereGeometry(0.035, 16, 16);
    const beadMat = new THREE.MeshBasicMaterial();
    const bead = new THREE.Mesh(beadGeo, beadMat);
    ringB.add(bead);
    rig.add(ringA, ringB);

    let dim = 1;
    const applyTheme = () => {
      const dark = document.documentElement.classList.contains("dark");
      const p = dark ? PALETTE.dark : PALETTE.light;
      uniforms.uGold.value.set(p.gold);
      uniforms.uEmber.value.set(p.ember);
      uniforms.uOpacity.value = p.opacity * dim;
      mat.blending = dark ? THREE.AdditiveBlending : THREE.NormalBlending;
      mat.needsUpdate = true;
      ringMat.color.set(p.ring);
      beadMat.color.set(p.ember);
    };
    applyTheme();
    const themeObserver = new MutationObserver(applyTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // half the visible frustum at the orb's depth, for mapping the pointer
    const view = { w: 1, h: 1 };
    const layout = () => {
      const { clientWidth: w, clientHeight: h } = el;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      view.h = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * CAMERA_Z;
      view.w = view.h * camera.aspect;
      const wide = camera.aspect > 1.1;
      rig.position.set(wide ? view.w * 0.4 : view.w * 0.35, wide ? 0.05 : view.h * 0.5, 0);
      rig.scale.setScalar(wide ? 0.8 : view.w * 0.75);
      dim = wide ? 1 : 0.55;
      applyTheme();
    };
    const ro = new ResizeObserver(layout);
    ro.observe(el);
    layout();

    const pointer = { x: 9, y: 9, active: 0, nx: 0, ny: 0 };
    const target = new THREE.Vector2();
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ny = -(((e.clientY - r.top) / r.height) * 2 - 1);
      pointer.x = pointer.nx * view.w - rig.position.x;
      pointer.y = pointer.ny * view.h - rig.position.y;
      pointer.active = 1;
    };
    const onLeave = () => (pointer.active = 0);
    addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    // only render while the hero is on screen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = reduced ? 0 : clock.elapsedTime;
      const progress = Math.min(scrollY / Math.max(el.clientHeight, 1), 1);

      uniforms.uTime.value = t;
      uniforms.uScroll.value += (progress - uniforms.uScroll.value) * 0.08;
      uniforms.uHover.value += (pointer.active - uniforms.uHover.value) * 0.06;
      uniforms.uMouse.value.lerp(target.set(pointer.x, pointer.y), 0.12);

      orb.rotation.y += reduced ? 0 : dt * 0.08;
      rig.rotation.x += (-pointer.ny * 0.18 + progress * 0.6 - rig.rotation.x) * 0.05;
      rig.rotation.y += (pointer.nx * 0.25 - rig.rotation.y) * 0.05;
      ringA.rotation.z = 0.35 + t * 0.05;
      bead.position.set(Math.cos(t * 0.6) * 1.85, 0, Math.sin(t * 0.6) * 1.85);
      el.style.opacity = String(1 - progress * 0.7);

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      themeObserver.disconnect();
      removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      [geo, ringA.geometry, ringB.geometry, beadGeo].forEach((g) => g.dispose());
      [mat, ringMat, beadMat].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={ref} aria-hidden className={className} />;
}
