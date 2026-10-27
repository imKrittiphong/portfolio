import { lazy, Suspense } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import CV from "@/assets/img/Krittiphong-butsaba_CV.pdf";

const HeroOrb = lazy(() => import("./HeroOrb"));

const enter = (ms: number) => ({ ["--enter-delay" as string]: `${ms}ms` });

const META = [
  { label: "Portfolio", value: "Edition 2026" },
  { label: "Based in", value: "Thailand · GMT+7" },
  { label: "Status", value: "Open to opportunities", live: true },
];

// Spinning circular label — doubles as the "view work" link.
function SpinBadge() {
  return (
    <a
      href="#project"
      data-cursor="Work"
      aria-label="View selected work"
      className="group relative hidden h-32 w-32 shrink-0 place-items-center md:grid"
    >
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none">
        <defs>
          <path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current font-mono text-[6.4px] uppercase">
          <textPath href="#badge-circle" textLength="236" lengthAdjust="spacing">
            Frontend Developer ✦ Selected Work ✦{" "}
          </textPath>
        </text>
      </svg>
      <span className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-background transition-all duration-500 group-hover:scale-110 group-hover:bg-ember">
        <ArrowDownRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-[-45deg]" />
      </span>
    </a>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative min-h-svh overflow-hidden">
      <Suspense>
        <HeroOrb className="absolute inset-0" />
      </Suspense>

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col justify-between gap-12 px-5 pt-28 pb-10 md:px-8">
        {/* Meta row */}
        <div className="animate-fadeInUp grid grid-cols-2 gap-6 border-t border-border pt-4 md:grid-cols-3" style={enter(100)}>
          {META.map((m) => (
            <div key={m.label} className={m.live ? "col-span-2 md:col-span-1 md:text-right" : ""}>
              <p className="eyebrow text-muted-foreground">{m.label}</p>
              <p className="mt-1 inline-flex items-center gap-2 text-sm">
                {m.live && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember" />
                  </span>
                )}
                {m.value}
              </p>
            </div>
          ))}
        </div>

        {/* Headline */}
        <div>
          <p className="eyebrow animate-fadeInUp mb-6 text-muted-foreground" style={enter(250)}>
            <span className="text-ember">—</span> Frontend &amp; Full-Stack Developer
          </p>
          <h1 className="font-serif text-[clamp(3.6rem,14vw,11.5rem)] leading-[0.86] font-normal tracking-[-0.03em]">
            <span className="line-mask">
              <span style={enter(300)}>Krittiphong</span>
            </span>
            <span className="line-mask pl-[8vw] md:pl-[14vw]">
              <span className="italic" style={enter(420)}>
                Butsaba<span className="text-ember">.</span>
              </span>
            </span>
          </h1>
        </div>

        {/* Intro + CTAs */}
        <div className="grid items-end gap-10 md:grid-cols-12">
          <p
            className="animate-fadeInUp max-w-md text-base leading-relaxed text-muted-foreground md:col-span-5 md:text-lg"
            style={enter(650)}
          >
            I design and build <span className="text-foreground">clean, interactive web applications</span>{" "}
            — turning ideas into interfaces that feel effortless to use.
          </p>

          <div className="animate-fadeInUp flex flex-wrap items-center gap-3 md:col-span-5" style={enter(750)}>
            <a
              href="#project"
              className="btn-sweep inline-flex items-center gap-3 bg-foreground px-6 py-3.5 text-sm text-background transition-colors duration-500 hover:text-ink"
            >
              View selected work
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={CV}
              download="Krittiphong-butsaba_CV.pdf"
              className="btn-sweep inline-flex items-center gap-3 border border-foreground px-6 py-3.5 text-sm transition-colors duration-500 hover:text-ink"
            >
              Download CV
            </a>
          </div>

          <div className="animate-fadeInUp flex items-end justify-between md:col-span-2 md:justify-end" style={enter(850)}>
            <a href="#about" className="flex items-center gap-3 md:hidden" aria-label="Scroll to about">
              <span className="relative block h-10 w-px overflow-hidden bg-border">
                <span className="animate-scrollLine absolute inset-0 bg-ember" />
              </span>
              <span className="eyebrow text-muted-foreground">Scroll</span>
            </a>
            <SpinBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
