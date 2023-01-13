import GreetingSkeleton from "@components/GreetingSkeleton";
import Greeting from "@components/Gretting";
import ProjectGrid from "@components/ProjectGrid";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className="h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingSkeleton />}>
            {/* @ts-expect-error Server Component */}
            <Greeting />
          </Suspense>
        </div>
        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
          {/* @ts-expect-error Server Component */}
          <ProjectGrid />
          <div className="w-1/3 p-3">{/* new project here */}</div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">{/* tasks here */}</div>
        </div>
      </div>
    </div>
  );
}
