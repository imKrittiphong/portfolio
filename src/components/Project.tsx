import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectData } from "@/constance/data";
import Reveal from "./Reveal";
import Modal from "./Modal";
import SectionHeading from "./SectionHeading";
import ThemeImg from "./ThemeImg";

/**
 * Floating preview that trails the cursor while a project row is hovered.
 * All covers sit in one vertical reel; the active one is slid into view.
 */
function HoverPreview({ active }: { active: number | null }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches) return;
    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let frame = 0;
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    const loop = () => {
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;
      const tilt = Math.max(-8, Math.min(8, (target.x - pos.x) * 0.08));
      if (ref.current) {
        ref.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(32px, -50%) rotate(${tilt}deg)`;
      }
      frame = requestAnimationFrame(loop);
    };
    addEventListener("mousemove", onMove);
    frame = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 z-30 hidden md:block">
      <div
        className="h-56 w-80 overflow-hidden shadow-2xl transition-[clip-path] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ clipPath: active === null ? "inset(50% 50% 50% 50%)" : "inset(0 0 0 0)" }}
      >
        <div
          className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: `translateY(${(-(active ?? 0) * 100) / ProjectData.length}%)` }}
        >
          {ProjectData.map((p) => (
            <img key={p.id} src={p.img[0]} alt="" className="h-56 w-80 object-cover object-top" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Project() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="project" className="scroll-mt-24">
      <SectionHeading
        index="03"
        label="Work"
        title={
          <>
            Selected <em className="text-ember">work</em>, built with care.
          </>
        }
      />

      <HoverPreview active={hovered} />

      <ul onMouseLeave={() => setHovered(null)}>
        {ProjectData.map((project, index) => (
          <Reveal as="li" key={project.id} delay={index * 100} className="border-t border-border last:border-b">
            <button
              type="button"
              data-cursor="View"
              onClick={() => setOpenId(project.id)}
              onMouseEnter={() => setHovered(index)}
              className="group relative grid w-full cursor-pointer grid-cols-12 items-center gap-4 py-8 text-left md:py-10"
            >
              {/* ember line that draws across on hover */}
              <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ember transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />

              <span className="col-span-2 self-start pt-3 font-mono text-xs text-muted-foreground md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="col-span-10 md:col-span-6">
                <span className="block font-serif text-4xl leading-none transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 group-hover:italic md:text-6xl">
                  {project.projectName}
                </span>
                <span className="mt-3 block max-w-md text-sm text-muted-foreground">{project.projectDis}</span>
              </span>

              <span className="col-span-10 col-start-3 flex gap-2 md:col-span-3 md:col-start-auto">
                {project.tech.map((t, i) => (
                  <span key={i} className="grid h-9 w-9 place-items-center rounded-full border border-border">
                    <ThemeImg src={t} alt="" className="h-4 w-4 object-contain" />
                  </span>
                ))}
              </span>

              <span className="col-span-12 flex items-center justify-between gap-4 md:col-span-2 md:justify-end">
                <span className="eyebrow inline-flex items-center gap-2 whitespace-nowrap text-muted-foreground">
                  <span className={`h-1.5 w-1.5 rounded-full ${project.done ? "bg-gold" : "animate-pulse bg-ember"}`} />
                  {project.done ? "Completed" : "In progress"}
                </span>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border transition-all duration-500 group-hover:rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-ink">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>

              {/* Touch devices get an inline cover instead of the floating preview */}
              <img
                src={project.img[0]}
                alt=""
                className="col-span-12 mt-2 aspect-[16/10] w-full object-cover object-top md:hidden"
              />
            </button>

            <Modal
              learn={project.learned}
              id={project.id}
              index={index}
              projectInfo={project.projectDis}
              projectName={project.projectName}
              tech={project.tech}
              img={project.img}
              done={project.done}
              isOpen={openId === project.id}
              onOpenChange={(val) => setOpenId(val ? project.id : null)}
              Link={project.gitLink}
            />
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export default Project;
