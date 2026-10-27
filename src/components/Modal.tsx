import { ArrowUpRight } from "lucide-react";
import GithubIcon from "@/assets/img/github-icon-1-logo-svgrepo-com.svg";
import { Dialog, DialogHeader, DialogDescription, DialogContent, DialogTitle } from "./ui/dialog";
import ThemeImg from "./ThemeImg";

interface PopupProps {
  id: number;
  index: number;
  projectName: string;
  img?: string[];
  projectInfo: string;
  tech: string[];
  done: boolean;
  isOpen: boolean;
  Link: string;
  learn: string;
  onOpenChange: (open: boolean) => void;
}

function Modal({ id, index, projectName, projectInfo, Link, img, isOpen, onOpenChange, tech, done, learn }: PopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} key={id}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-hidden rounded-none p-0 sm:max-w-5xl">
        <div className="grid max-h-[90vh] md:grid-cols-12">
          {/* Info column */}
          <div className="flex flex-col gap-8 border-b border-border p-8 md:col-span-5 md:border-r md:border-b-0">
            <DialogHeader className="gap-4 text-left">
              <p className="eyebrow text-ember">
                Project {String(index + 1).padStart(2, "0")} — {done ? "Completed" : "In progress"}
              </p>
              <DialogTitle className="font-serif text-5xl leading-none font-normal">{projectName}</DialogTitle>
              <DialogDescription className="text-base leading-relaxed">{projectInfo}</DialogDescription>
            </DialogHeader>

            <div>
              <p className="eyebrow mb-2 text-muted-foreground">What I learned</p>
              <p className="leading-relaxed">{learn}</p>
            </div>

            <div>
              <p className="eyebrow mb-3 text-muted-foreground">Built with</p>
              <div className="flex gap-2">
                {tech.map((t, i) => (
                  <span key={i} className="grid h-10 w-10 place-items-center rounded-full border border-border">
                    <ThemeImg src={t} alt="" className="h-5 w-5 object-contain" />
                  </span>
                ))}
              </div>
            </div>

            <a
              href={Link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sweep mt-auto inline-flex items-center justify-between gap-3 border border-foreground px-5 py-3.5 text-sm transition-colors duration-500 hover:text-ink"
            >
              <span className="inline-flex items-center gap-3">
                <ThemeImg src={GithubIcon} alt="" className="h-5 w-5" />
                View source on GitHub
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>

          {/* Screens */}
          <div className="max-h-[50vh] space-y-4 overflow-y-auto bg-muted p-6 md:col-span-7 md:max-h-[90vh]">
            {img?.map((image, i) => (
              <img key={image} src={image} alt={`${projectName} screen ${i + 1}`} className="w-full shadow-lg" />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
