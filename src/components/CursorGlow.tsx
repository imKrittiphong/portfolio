import { useEffect, useRef, useState } from "react";

/**
 * A soft amber light that follows the cursor. Fixed, non-interactive, and
 * eased toward the pointer for a smooth trailing feel. Hidden on touch
 * devices and when the pointer leaves the window.
 */
export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable for devices with a fine pointer (mouse / trackpad).
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let visible = false;
    let frame = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      visible = true;
    };
    const onLeave = () => {
      visible = false;
    };

    const render = () => {
      // Ease current position toward the pointer.
      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;
      const el = glowRef.current;
      if (el) {
        el.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`;
        el.style.opacity = visible ? "1" : "0";
      }
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={glowRef}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-30 h-30 w-30 rounded-full opacity-0 mix-blend-multiply blur-3xl transition-opacity duration-300 dark:mix-blend-screen"
      style={{
        background:
          "radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(245,158,11,0.12) 40%, transparent 70%)",
      }}
    />
  );
}
