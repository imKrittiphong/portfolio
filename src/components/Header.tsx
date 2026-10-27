import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skill", label: "Skills" },
  { href: "#project", label: "Work" },
  { href: "#contact", label: "Contact" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="grid h-9 w-9 cursor-pointer place-items-center rounded-full border border-border transition-colors hover:border-foreground"
    >
      <Sun className="hidden h-4 w-4 dark:block" />
      <Moon className="block h-4 w-4 dark:hidden" />
    </button>
  );
}

// Live local time — a small detail that says "a real person, somewhere".
function LocalTime() {
  const format = () =>
    new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Bangkok" }).format(new Date());
  const [time, setTime] = useState(format);

  useEffect(() => {
    const id = setInterval(() => setTime(format()), 15_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="eyebrow hidden text-muted-foreground lg:inline">
      BKK <span className="text-foreground">{time}</span>
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled && !open ? "border-b border-border bg-background/80 backdrop-blur-xl" : "border-b border-transparent"
        )}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a href="#top" className="group flex items-baseline gap-2" onClick={() => setOpen(false)}>
            <span className="font-serif text-2xl leading-none italic">K</span>
            <span className="eyebrow hidden transition-colors group-hover:text-ember sm:inline">Krittiphong · Portfolio</span>
          </a>

          <div className="hidden items-center gap-9 md:flex">
            {NAV_LINKS.map((link, i) => (
              <a key={link.href} href={link.href} className="group flex items-baseline gap-1.5 text-sm">
                <span className="font-mono text-[10px] text-muted-foreground transition-colors group-hover:text-ember">
                  0{i + 1}
                </span>
                <span className="link-draw">{link.label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <LocalTime />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              className="eyebrow cursor-pointer md:hidden"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col justify-end bg-background px-5 pb-12 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden",
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        )}
      >
        <ul className="space-y-2">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="flex items-baseline gap-4 border-t border-border pt-3">
              <span className="font-mono text-xs text-ember">0{i + 1}</span>
              <a href={link.href} onClick={() => setOpen(false)} className="font-serif text-6xl italic">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
