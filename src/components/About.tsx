import { MapPin, Sparkles } from "lucide-react";
import Reveal from "./Reveal";

function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <Reveal className="mb-10 flex items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500">
          01
        </span>
        <h2 className="text-3xl font-bold tracking-tight">About Me</h2>
        <span className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
      </Reveal>

      <div className="grid gap-8 md:grid-cols-5">
        <Reveal
          delay={100}
          className="md:col-span-3 rounded-2xl border border-zinc-200/70 bg-white/60 p-8 backdrop-blur-sm transition-colors hover:border-amber-300/70 dark:border-zinc-800/70 dark:bg-zinc-900/40 dark:hover:border-amber-700/50"
        >
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Krittiphong Butsaba
          </h3>
          <p className="leading-relaxed text-zinc-600 dark:text-zinc-300">
            Hello! I'm passionate about technology and enjoy creating web
            applications from the first sketch to the final deploy. I care about
            clean code, thoughtful UX, and building things that actually help
            people — and I'm always looking for the next thing to learn.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Problem solver", "Fast learner", "Team player"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={220}
          className="md:col-span-2 flex flex-col gap-4"
        >
          {[
            { label: "Role", value: "Frontend / Full-Stack Dev" },
            { label: "Focus", value: "React · TypeScript · Tailwind" },
            { label: "Location", value: "Thailand", icon: true },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-zinc-200/70 bg-white/60 p-5 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 dark:border-zinc-800/70 dark:bg-zinc-900/40"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                {item.label}
              </p>
              <p className="mt-1 flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-100">
                {item.icon && <MapPin className="h-4 w-4 text-amber-500" />}
                {item.value}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export default About;
