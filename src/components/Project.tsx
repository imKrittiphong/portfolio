import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectData } from "@/constance/data";
import Reveal from "./Reveal";
import Modal from "./Modal";

function Project() {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <section id="project" className="scroll-mt-24">
      <Reveal className="mb-10 flex items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500">
          03
        </span>
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <span className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {ProjectData.map((project, index) => (
          <Reveal key={project.id} delay={index * 100}>
            <article className="group h-full overflow-hidden rounded-2xl border border-zinc-200/70 bg-white/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-amber-300/70 hover:shadow-xl hover:shadow-amber-500/5 dark:border-zinc-800/70 dark:bg-zinc-900/40 dark:hover:border-amber-700/50">
              <button
                type="button"
                onClick={() => setOpenId(project.id)}
                className="relative block h-48 w-full cursor-pointer overflow-hidden"
              >
                <img
                  src={project.img[0]}
                  alt={project.projectName}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-end justify-center bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-4 py-1.5 text-sm font-medium text-zinc-900">
                    View details <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </button>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {project.projectName}
                  </h3>
                  <div className="flex shrink-0 gap-1.5">
                    {project.tech.slice(0, 4).map((t, i) => (
                      <img key={i} src={t} alt="" className="h-5 w-5" />
                    ))}
                  </div>
                </div>
                <p className="mt-2 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {project.projectDis}
                </p>
              </div>
            </article>

            <Modal
              learn={project.learned}
              id={project.id}
              projectInfo={project.projectDis}
              projectName={project.projectName}
              tech={project.tech}
              img={project.img}
              isOpen={openId === project.id}
              onOpenChange={(val) => setOpenId(val ? project.id : null)}
              Link={project.gitLink}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Project;
