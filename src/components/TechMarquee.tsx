import Marquee from "react-fast-marquee";
import { Language, Tool } from "@/constance/data";

const NAMES = [...Language.map((l) => l.lang), ...Tool.map((t) => t.tools)];

/** Slow ticker of the stack between the hero and the content. */
export default function TechMarquee() {
  return (
    <div className="border-y border-border py-5">
      <Marquee autoFill pauseOnHover speed={35}>
        {NAMES.map((name) => (
          <span key={name} className="flex items-center font-serif text-3xl italic md:text-4xl">
            <span className="px-8 transition-colors hover:text-ember">{name}</span>
            <span className="text-base text-gold not-italic">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
