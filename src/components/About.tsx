import ProfilePic from "@/assets/img/stdpic.jpg";
import { Button } from "./ui/button";
import { ArrowUpRight } from "lucide-react";


function About() {

  return (
    <div id="about" className="mx-auto max-w-4xl  mt-38">
      <div>
        <h1 className="scroll-m-20 ml-2 text-3xl font-bold tracking-tight">
          About Me
        </h1>
        <div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={ProfilePic}
              alt="Profile"
              className="w-40 h-40 object-cover rounded-lg border border-zinc-300 dark:border-zinc-700 shrink-0"
            />
            <div className="space-y-3 text-zinc-700 dark:text-zinc-300">
              <h2 className="text-xl font-semibold">Krittiphong Butsaba</h2>
              <p>
                Hello! My name is Krittiphong Butsaba. I am passionate about
                technology and enjoy creating web applications. I am dedicated
                to continuously improving my skills and growing as a developer.
              </p>

              <hr />
            </div>
          </div>
          <div className="flex justify-center-safe mt-14">
            <Button asChild className="cursor-pointer">
              <a
                href={ProfilePic}
                download="profile.png"
              >
                Get My CV
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
