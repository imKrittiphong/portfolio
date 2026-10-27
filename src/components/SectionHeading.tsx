import type { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: ReactNode;
  className?: string;
}

/** Editorial section opener: hairline rule, mono index, large serif title. */
export default function SectionHeading({ index, label, title, className = "" }: SectionHeadingProps) {
  return (
    <Reveal className={`mb-14 md:mb-20 ${className}`}>
      <div className="eyebrow flex items-center justify-between border-t border-current/15 pt-4 opacity-80">
        <span>
          <span className="text-ember">({index})</span>&nbsp;&nbsp;{label}
        </span>
        <span className="hidden sm:inline">Krittiphong Butsaba</span>
      </div>
      <h2 className="mt-8 max-w-4xl font-serif text-5xl leading-[0.95] font-normal tracking-[-0.02em] md:text-7xl">
        {title}
      </h2>
    </Reveal>
  );
}
