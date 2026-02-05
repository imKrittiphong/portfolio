import { Language, Tool } from "@/constance/data";
import { Card, CardContent, CardDescription } from "../ui/card";

function Skill() {
  return (
    <div className="space-y-6 border border-zinc-300 dark:border-zinc-700 rounded-lg p-6">
      <div className="text-2xl font-bold">Skills</div>
      <div className="space-y-4">
        <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
          Language
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {Language.map((i) => (
            <div key={i.lang} className="group relative">
              <div className="absolute -inset-1 bg-linear-to-r from-amber-400 to-amber-600 rounded-lg opacity-0 group-hover:opacity-75 blur-lg transition duration-300 -z-10" />

              <Card
                className="border-0 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative"
                size="sm"
              >
                <CardContent className="flex justify-center p-2">
                  <img src={i.img} width={28} alt={i.lang} />
                </CardContent>
                <CardDescription className="text-center text-xs">
                  {i.lang}
                </CardDescription>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wide">
          Tools / Framework
        </div>
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {Tool.map((i) => (
            <div key={i.tools} className="group relative">
              <div className="absolute -inset-1 bg-linear-to-r from-amber-400 to-amber-600 rounded-lg opacity-0 group-hover:opacity-75 blur-lg transition duration-300 -z-10" />

              <Card
                className="border-0 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors relative"
                size="sm"
              >
                <CardContent className="flex justify-center p-2">
                  <img src={i.img} width={28} alt={i.tools} />
                </CardContent>
                <CardDescription className="text-center text-xs">
                  {i.tools}
                </CardDescription>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Skill;
