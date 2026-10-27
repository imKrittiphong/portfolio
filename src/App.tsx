import About from "./components/About";
import Contact from "./components/Contact";
import Cursor from "./components/Cursor";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Project from "./components/Project";
import Skill from "./components/Skill";
import TechMarquee from "./components/TechMarquee";
import { ThemeProvider } from "./components/theme";

export function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Cursor />
      <div aria-hidden className="grain" />

      <Header />
      <Hero />
      <TechMarquee />
      <main className="mx-auto max-w-6xl space-y-36 px-5 py-28 md:space-y-48 md:px-8 md:py-36">
        <About />
        <Skill />
        <Project />
      </main>
      <Contact />
    </ThemeProvider>
  );
}

export default App;
