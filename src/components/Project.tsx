import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import Modal from "./Modal";
import { useState } from "react";
import { ProjectData } from "@/constance/data";

function Project() {
  const [openId, setOpenId] = useState<number | null>(null);
  const pjData = ProjectData;

  return (
    <>
      <div className="space-y-6" id="project">
        <div className="ml-4 text-2xl font-bold">Own Projects</div>
        <div className="grid grid-cols-2 gap-4 ">
          {pjData.map((i) => (
            <div>
              <Card
                className="border relative transition duration-300"
                size="sm"
              >
                <CardHeader key={i.id}>{i.projectName}</CardHeader>
                <CardContent
                  className="relative overflow-hidden cursor-pointer group h-44"
                  onClick={() => setOpenId(i.id)}
                >
                  <img
                    src={i.img[0]}
                    width={1200}
                    height={1200}
                    className="w-full transition duration-300 group-hover:blur-sm"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <span className="bg-black text-white px-4 py-2 rounded-2xl text-sm">
                      Detail
                    </span>
                  </div>
                </CardContent>
                <CardDescription className="p-2 truncate">
                  {i.projectDis}
                </CardDescription>
              </Card>
              <Modal
                learn={i.learned}
                id={i.id}
                projectInfo={i.projectDis}
                projectName={i.projectName}
                tech={i.tech}
                img={i.img}
                isOpen={openId === i.id}
                onOpenChange={(val) => setOpenId(val ? i.id : null)}
                Link={i.gitLink}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Project;
