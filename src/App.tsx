import About from "./components/About";
import Contact from "./components/Contact";
import CursorGlow from "./components/CursorGlow";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Project from "./components/Project";
import Skill from "./components/Skill";
import { ThemeProvider } from "./components/theme";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <CursorGlow />

      {/* Animated ambient background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-amber-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-amber-950/30" />
        <div className="absolute top-0 left-1/4 h-96 w-96 animate-blob rounded-full bg-amber-200 opacity-30 mix-blend-multiply blur-2xl filter dark:bg-amber-900/20" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 animate-blob rounded-full bg-zinc-300 opacity-30 mix-blend-multiply blur-2xl filter animation-delay-2000 dark:bg-zinc-700/20" />
        <div className="absolute top-1/2 right-0 h-96 w-96 animate-blob rounded-full bg-amber-100 opacity-20 mix-blend-multiply blur-2xl filter animation-delay-4000 dark:bg-amber-800/10" />
      </div>

      <div className="relative z-0">
        <Header />
        <Hero />
        <main className="mx-auto max-w-4xl space-y-28 px-4 py-16">
          <About />
          <Skill />
          <Project />
          <Contact />
        </main>
        <footer className="border-t border-zinc-200/60 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800/60 dark:text-zinc-500">
          © 2026 Krittiphong Butsaba · Built with React &amp; Tailwind CSS
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
