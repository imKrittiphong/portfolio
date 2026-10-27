import { useEffect, useRef, useState } from "react";

/**
 * A thin ember ring that trails the pointer. Over links/buttons it swells;
 * over elements with `data-cursor="Label"` it fills and shows the label.
 * Fine-pointer devices only; the native cursor stays visible.
 */
export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled] = useState(() => matchMedia("(pointer: fine)").matches);
  const [label, setLabel] = useState("");
  const [mode, setMode] = useState<"idle" | "link" | "label">("idle");

  useEffect(() => {
    if (!enabled) return;

    const target = { x: innerWidth / 2, y: innerHeight / 2 };
    const pos = { ...target };
    let shown = false;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      shown = true;
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as Element;
      const labelled = el.closest<HTMLElement>("[data-cursor]");
      if (labelled) {
        setLabel(labelled.dataset.cursor ?? "");
        setMode("label");
      } else {
        setMode(el.closest("a, button") ? "link" : "idle");
      }
    };
    const onLeave = () => (shown = false);

    const render = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      const el = ringRef.current;
      if (el) {
        el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
        el.style.opacity = shown ? "1" : "0";
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    addEventListener("mousemove", onMove);
    addEventListener("mouseover", onOver);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("mousemove", onMove);
      removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = mode === "label" ? "h-20 w-20 bg-ember border-ember" : mode === "link" ? "h-12 w-12 border-ember" : "h-7 w-7 border-ember/70";

  return (
    <div
      ref={ringRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[70] opacity-0 transition-opacity duration-300"
    >
      <div
        className={`grid place-items-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${size}`}
      >
        <span
          className={`eyebrow text-ink transition-opacity duration-300 ${mode === "label" ? "opacity-100" : "opacity-0"}`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
