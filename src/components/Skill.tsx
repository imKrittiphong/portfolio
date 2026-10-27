import { Language, Tool } from "@/constance/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ThemeImg from "./ThemeImg";

interface SkillItem {
  img: string;
  name: string;
}

function SkillGroup({ index, title, items }: { index: string; title: string; items: SkillItem[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <Reveal className="md:col-span-3">
        <p className="eyebrow text-ember">{index}</p>
        <h3 className="mt-2 font-serif text-3xl italic">{title}</h3>
        <p className="eyebrow mt-2 text-muted-foreground">{String(items.length).padStart(2, "0")} items</p>
      </Reveal>

      {/* Hairline spec-sheet grid: bordered cells overlap by 1px so lines stay single */}
      <div className="grid grid-cols-2 pt-px pl-px sm:grid-cols-3 md:col-span-9 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.name} delay={i * 50} className="-mt-px -ml-px border border-border">
            <div className="btn-sweep group flex h-full items-center gap-3 p-5 transition-colors duration-500 hover:text-ink">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-card transition-transform duration-500 group-hover:-rotate-12">
                <ThemeImg src={item.img} alt="" className="h-5 w-5 object-contain" />
              </span>
              <span className="text-sm">{item.name}</span>
              <span className="ml-auto font-mono text-[10px] opacity-40">{String(i + 1).padStart(2, "0")}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function Skill() {
  const languages: SkillItem[] = Language.map((l) => ({ img: l.img, name: l.lang }));
  const tools: SkillItem[] = Tool.map((t) => ({ img: t.img, name: t.tools }));

  return (
    <section id="skill" className="scroll-mt-24">
      <SectionHeading
        index="02"
        label="Skills"
        title={
          <>
            Tools of the <em className="text-ember">craft</em>.
          </>
        }
      />

      <div className="space-y-16">
        <SkillGroup index="A." title="Languages" items={languages} />
        <SkillGroup index="B." title="Tools & Frameworks" items={tools} />
      </div>
    </section>
  );
}

export default Skill;
