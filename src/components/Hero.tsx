import { ArrowUpRight, ChevronDown, Download } from "lucide-react";
import ProfilePic from "@/assets/img/stdpic.jpg";
import ReactLogo from "@/assets/img/React.svg";
import TSLogo from "@/assets/img/TSLogo.svg";
import TailwindCSS from "@/assets/img/Tailwind CSS.svg";
import { Button } from "./ui/button";

const FLOATING = [
  { img: ReactLogo, className: "top-2 -left-6 h-11 w-11", delay: "0s" },
  { img: TSLogo, className: "-bottom-4 -left-2 h-10 w-10", delay: "1.2s" },
  { img: TailwindCSS, className: "-top-5 right-2 h-10 w-10", delay: "0.6s" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-16 text-center"
    >
      {/* Availability pill */}
      <div
        className="animate-fadeInUp mb-8 inline-flex items-center gap-2 rounded-full border border-zinc-300/70 bg-white/50 px-4 py-1.5 text-xs font-medium text-zinc-600 backdrop-blur-sm dark:border-zinc-700/70 dark:bg-zinc-900/40 dark:text-zinc-400"
        style={{ ["--enter-delay" as string]: "0ms" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Open to opportunities
      </div>

      {/* Avatar with floating tech badges */}
      <div
        className="animate-fadeInUp relative mb-8"
        style={{ ["--enter-delay" as string]: "120ms" }}
      >
        <div className="absolute -inset-3 -z-10 rounded-full bg-linear-to-tr from-amber-400 to-amber-600 opacity-30 blur-2xl" />
        <img
          src={ProfilePic}
          alt="Krittiphong Butsaba"
          className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl dark:border-zinc-800"
        />
        {FLOATING.map((f) => (
          <div
            key={f.className}
            className={`animate-float absolute ${f.className} grid place-items-center rounded-xl border border-zinc-200/70 bg-white/90 p-2 shadow-lg backdrop-blur dark:border-zinc-700/70 dark:bg-zinc-900/90`}
            style={{ animationDelay: f.delay }}
          >
            <img src={f.img} alt="" className="h-full w-full" />
          </div>
        ))}
      </div>

      {/* Headline */}
      <h1
        className="animate-fadeInUp max-w-3xl text-5xl font-bold tracking-tight md:text-7xl"
        style={{ ["--enter-delay" as string]: "220ms" }}
      >
        <span className="text-zinc-900 dark:text-zinc-100">Hi, I'm </span>
        <span className="animate-gradientMove bg-linear-to-r from-amber-500 via-amber-600 to-amber-400 bg-size-[200%_200%] bg-clip-text text-transparent">
          Krittiphong
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className="animate-fadeInUp mt-5 max-w-xl text-lg text-zinc-600 md:text-xl dark:text-zinc-400"
        style={{ ["--enter-delay" as string]: "320ms" }}
      >
        A frontend &amp; full-stack developer who loves turning ideas into
        clean, interactive web applications.
      </p>

      {/* CTAs */}
      <div
        className="animate-fadeInUp mt-9 flex flex-wrap items-center justify-center gap-4"
        style={{ ["--enter-delay" as string]: "420ms" }}
      >
        <Button asChild size="lg" className="cursor-pointer">
          <a href="#project">
            View Projects
            <ArrowUpRight />
          </a>
        </Button>
        <Button asChild size="lg" variant="outline" className="cursor-pointer">
          <a href={ProfilePic} download="profile.png">
            <Download />
            Get My CV
          </a>
        </Button>
      </div>

      {/* Scroll cue */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="animate-fadeInUp absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-400 dark:text-zinc-600"
        style={{ ["--enter-delay" as string]: "600ms" }}
      >
        <ChevronDown className="animate-scrollCue h-6 w-6" />
      </a>
    </section>
  );
}
