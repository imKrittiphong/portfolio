import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";

function Project() {
  return (
    <div className="space-y-6">
      <div className="pl-4 md:pl-14 text-2xl font-bold">Projects</div>
      <div className="grid grid-cols-3 gap-4 ">
        <Card className="border  relative  transition duration-300" size="sm">
          <CardHeader>Project Name</CardHeader>
          <CardContent className="hover:blur transition duration-300">
            <img src="" width={1200} height={1200} className="bg-white" />
          </CardContent>
          <CardDescription className="p-2">
            About Project Desription
          </CardDescription>
        </Card>

        <Card className="border  relative  transition duration-300" size="sm">
          <CardHeader>Project Name</CardHeader>
          <CardContent>
            <img src="" width={1200} height={1200} className="bg-white" />
          </CardContent>
          <CardDescription className="p-2">
            About Project Desription
          </CardDescription>
        </Card>

        <Card className="border  relative  transition duration-300" size="sm">
          <CardHeader>Project Name</CardHeader>
          <CardContent>
            <img src="" width={1200} height={1200} className="bg-white" />
          </CardContent>
          <CardDescription className="p-2">
            About Project Desription
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}

export default Project;
