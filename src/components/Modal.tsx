import GitHup from "@/assets/img/GitHub_Invertocat_White.svg";
import {
  Dialog,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";

interface PopupProps {
  id: number;
  projectName: string;
  img?: string[];
  projectInfo: string;
  tech: string[];
  isOpen: boolean;
  Link: string;
  learn: string;
  onOpenChange: (open: boolean) => void;
}

function Modal({
  id,
  projectName,
  projectInfo,
  Link,
  img,
  isOpen,
  onOpenChange,
  tech,
  learn
}: PopupProps) {
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onOpenChange} key={id}>
        <DialogContent  className="sm:max-w-4xl" >
          <DialogHeader>
            <DialogTitle>{projectName}</DialogTitle>
            <DialogDescription>{projectInfo}</DialogDescription>
            <DialogDescription>
              <div>
                <p className="text-white">Learned</p>
                <p>{learn}</p>
              </div>
              </DialogDescription>
          </DialogHeader>
          <div className=" mx-4 max-h-[50vh] overflow-y-auto px-4 space-y-4">
            {img?.map((image) => (
              <img src={image} />
            ))}
          </div>
          <div className="flex justify-between w-full">
            <a href={Link} target="_blank">
              <img
                src={GitHup}
                alt="github"
                className="w-8 cursor-pointer hover:scale-110 transition"
                />
            </a>
            <div className="flex gap-3">
            <Label className="text-amber-500">Work Tool :</Label>
              {tech.map((img, i) => (
                <img key={i} src={img} className="w-8" />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Modal;
