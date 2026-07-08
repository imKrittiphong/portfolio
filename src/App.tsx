import About from "./components/About";
import Contact from "./components/Contact";
import Header from "./components/Header";
import Project from "./components/Project";
import Skill from "./components/Skill";
import { ThemeProvider } from "./components/theme";

export function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-amber-50 via-white to-zinc-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-amber-950/30" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200 dark:bg-amber-900/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-300 dark:bg-zinc-700/20 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-amber-100 dark:bg-amber-800/10 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-blob animation-delay-4000" />
        </div>
        <div className="relative z-0">
          <div className="relative z-0">
            <Header />
            <main className="max-w-4xl mx-auto  px-4 space-y-24">
              <About />
              <Skill />
              <Project />
              <Contact />
            </main>
            <footer className="text-center py-6 text-zinc-700">
              © 2026 Krittiphong Butsaba
            </footer>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
