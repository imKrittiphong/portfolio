import ProfilePic from "@/assets/img/stdpic.jpg";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const DETAILS = [
  { label: "Role", value: "Frontend / Full-Stack Developer" },
  { label: "Focus", value: "React · TypeScript · Next.Js" },
  { label: "Location", value: "Thailand" },
  {
    label: "Education",
    value: "B.Sc. Information Technology and Mobile Software Innovation (ITMI)",
    note: "Mahanakorn University",
  },
];

function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <SectionHeading
        index="01"
        label="About"
        title={
          <>
            A developer with an eye for <em className="text-ember">detail</em>.
          </>
        }
      />

      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        {/* Portrait */}
        <Reveal delay={100} className="md:col-span-5">
          <figure className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <img
                src={ProfilePic}
                alt="Krittiphong Butsaba"
                className="h-full w-full object-cover grayscale transition-all duration-1000 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gold/20 mix-blend-multiply transition-opacity duration-1000 group-hover:opacity-0" />
            </div>
            {/* Gold corner marks */}
            <span className="absolute -top-2 -left-2 h-6 w-6 border-t border-l border-gold" />
            <span className="absolute -right-2 -bottom-2 h-6 w-6 border-r border-b border-gold" />
            <figcaption className="eyebrow mt-4 flex justify-between text-muted-foreground">
              <span>Krittiphong Butsaba</span>
              <span>Fig. 01</span>
            </figcaption>
          </figure>
        </Reveal>

        {/* Statement + details */}
        <div className="md:col-span-7">
          <Reveal delay={150}>
            <p className="font-serif text-3xl leading-[1.2] md:text-4xl">
              I build <em className="text-ember">intuitive</em>, responsive interfaces — turning designs into
              functional products with code that is easy to <em>maintain</em>.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <p className="mt-8 max-w-xl leading-relaxed text-muted-foreground">
              I’m a Frontend Developer passionate about building user-friendly web applications. I work with modern
              frontend technologies, integrate APIs, and keep learning — especially around AI-assisted development —
              to deliver better solutions.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Problem solver", "Fast learner"].map((tag) => (
                <span key={tag} className="eyebrow rounded-full border border-border px-3 py-1.5">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          <dl className="mt-12">
            {DETAILS.map((d, i) => (
              <Reveal
                key={d.label}
                delay={300 + i * 80}
                className="group grid grid-cols-3 gap-4 border-t border-border py-5 last:border-b"
              >
                <dt className="eyebrow pt-1 text-muted-foreground transition-colors group-hover:text-ember">
                  {d.label}
                </dt>
                <dd className="col-span-2">
                  {d.value}
                  {d.note && <span className="mt-1 block text-sm text-muted-foreground">{d.note}</span>}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default About;
