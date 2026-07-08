import { Language, Tool } from "@/constance/data";
import Reveal from "./Reveal";

const KNOWLEDGE = [
  "AI-assisted development",
  "UX/UI Best Practices",
  "Git & GitHub For Team Working",
  "Clean Code",
  "Scalable Frontend Architecture",
  "Database Design",
  "System Design",
];

interface SkillItem {
  img: string;
  name: string;
}

function SkillGrid({ items }: { items: SkillItem[] }) {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
      {items.map((item, index) => (
        <Reveal
          key={item.name}
          delay={index * 60}
          className="group relative"
        >
          <div className="absolute -inset-0.5 -z-10 rounded-xl bg-linear-to-r from-amber-400 to-amber-600 opacity-0 blur-md transition duration-300 group-hover:opacity-70" />
          <div className="flex h-full flex-col items-center gap-2 rounded-xl border border-zinc-200/70 bg-white/70 p-4 backdrop-blur-sm transition-all duration-300 group-hover:-translate-y-1 dark:border-zinc-800/70 dark:bg-zinc-900/70">
            <img
              src={item.img}
              alt={item.name}
              className="h-8 w-8 transition-transform duration-300 group-hover:scale-110"
            />
            <span className="text-center text-xs font-medium text-zinc-700 dark:text-zinc-300">
              {item.name}
            </span>
            
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Skill() {
  const languages: SkillItem[] = Language.map((l) => ({
    img: l.img,
    name: l.lang,
    level: l.exrt,
  }));
  const tools: SkillItem[] = Tool.map((t) => ({
    img: t.img,
    name: t.tools,
    level: t.exrt,
  }));

  return (
    <section id="skill" className="scroll-mt-24">
      <Reveal className="mb-10 flex items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500">
          02
        </span>
        <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
        <span className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
      </Reveal>

      <div className="space-y-10">
        <div className="space-y-4">
          <Reveal
            as="h3"
            className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
          >
            Languages
          </Reveal>
          <SkillGrid items={languages} />
        </div>

        <div className="space-y-4">
          <Reveal
            as="h3"
            className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
          >
            Tools / Frameworks
          </Reveal>
          <SkillGrid items={tools} />
        </div>

        <div className="space-y-4">
          <Reveal
            as="h3"
            className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
          >
            Knowledge
          </Reveal>
          <div className="flex flex-wrap gap-2.5">
            {KNOWLEDGE.map((k, index) => (
              <Reveal
                key={k}
                delay={index * 50}
                className="rounded-full border border-zinc-200/70 bg-white/60 px-4 py-2 text-sm text-zinc-700 transition-colors hover:border-amber-400 hover:text-amber-700 dark:border-zinc-800/70 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:text-amber-400"
              >
                {k}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skill;
