import { useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import { ContactData } from "@/constance/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import ThemeImg from "./ThemeImg";

const EMAIL = "im.krittipbutsaba29@gmail.com";

// Inverted (ink on light theme, ivory on dark) closing section with the footer.
function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-0 bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-5 pt-28 pb-10 md:px-8 md:pt-36">
        <SectionHeading
          index="04"
          label="Contact"
          title={
            <>
              Let’s build something <em className="text-gold">remarkable</em> together.
            </>
          }
        />

        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="eyebrow opacity-60">Write to me</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <a
                href={`mailto:${EMAIL}`}
                className="link-draw font-serif text-3xl break-all italic transition-colors hover:text-gold sm:text-4xl md:text-5xl"
              >
                {EMAIL}
              </a>
              <button
                type="button"
                onClick={copy}
                aria-label="Copy email address"
                className="eyebrow inline-flex cursor-pointer items-center gap-2 rounded-full border border-background/25 px-3 py-2 transition-colors hover:border-gold hover:text-gold"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-8 max-w-md leading-relaxed opacity-60">
              I’m currently open to new opportunities and collaborations — a quick hello is always welcome.
            </p>
          </Reveal>

          <ul className="md:col-span-5">
            {ContactData.map((c, i) => (
              <Reveal as="li" key={c.cont} delay={i * 100} className="border-t border-background/15 last:border-b">
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-background">
                    <ThemeImg src={c.img} alt="" className="h-5 w-5 object-contain" />
                  </span>
                  <span className="flex-1 transition-transform duration-500 group-hover:translate-x-2">
                    <span className="block font-serif text-2xl">{c.cont}</span>
                    <span className="eyebrow block opacity-50">{c.nameAct}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 opacity-50 transition-all duration-500 group-hover:rotate-45 group-hover:text-gold group-hover:opacity-100" />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>

        {/* Oversized signature */}
        <p
          aria-hidden
          className="mt-24 font-serif text-[clamp(4rem,19vw,16rem)] leading-[0.8] tracking-[-0.04em] whitespace-nowrap opacity-[0.07] select-none"
        >
          Krittiphong
        </p>

        <footer className="eyebrow mt-6 flex flex-col gap-4 border-t border-background/15 pt-6 opacity-70 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Krittiphong Butsaba</span>
          <span>Designed &amp; built with React · Three.js</span>
          <a href="#top" className="inline-flex items-center gap-2 transition-colors hover:text-gold">
            Back to top <ArrowUp className="h-3.5 w-3.5" />
          </a>
        </footer>
      </div>
    </section>
  );
}

export default Contact;
