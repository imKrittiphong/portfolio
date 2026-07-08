import { ArrowUpRight } from "lucide-react";
import { ContactData } from "@/constance/data";
import Reveal from "./Reveal";

function Contact() {
  return (
    <section id="contact" className="scroll-mt-24">
      <Reveal className="mb-10 flex items-center gap-3">
        <span className="text-sm font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-500">
          04
        </span>
        <h2 className="text-3xl font-bold tracking-tight">Get In Touch</h2>
        <span className="h-px flex-1 bg-linear-to-r from-amber-500/50 to-transparent" />
      </Reveal>

      <Reveal className="relative overflow-hidden rounded-3xl border border-zinc-200/70 bg-white/60 p-10 text-center backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-900/40">
        <div className="absolute -top-20 left-1/2 -z-10 h-56 w-56 -translate-x-1/2 rounded-full bg-amber-400/20 blur-3xl" />
        <h3 className="text-2xl font-bold tracking-tight">
          Let's build something together
        </h3>
        <p className="mx-auto mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
          I'm currently open to new opportunities and collaborations. Feel free
          to reach out through any of the channels below.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {ContactData.map((contact, index) => (
            <Reveal key={contact.cont} delay={index * 100}>
              <a
                href={contact.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-zinc-200/70 bg-white/70 px-5 py-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 dark:border-zinc-800/70 dark:bg-zinc-900/60"
              >
                <img
                  src={contact.img}
                  alt={contact.cont}
                  className="h-6 w-6 shrink-0"
                />
                <span>
                  <span className="block text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {contact.cont}
                  </span>
                  <span className="block text-xs text-zinc-500 dark:text-zinc-400">
                    {contact.nameAct}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber-500" />
              </a>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

export default Contact;
