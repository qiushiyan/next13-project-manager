import GreetingSkeleton from "@components/GreetingSkeleton";
import Greeting from "@components/Greeting";
import ProjectCard from "@components/ProjectCard";
import TasksCard from "@components/TasksCard";
import TasksCardSkeleton from "@components/TasksCardSkeleton";
import Card from "@components/ui/Card";
import { getUserFromCookie } from "@lib/auth";
import { findUserProjects, prisma } from "@lib/db";
import { delay } from "@lib/utils";
import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import NewProject from "@components/NewProject";

const getProjects = async () => {
  await delay(1000);
  const user = await getUserFromCookie(cookies());

  if (!user) {
    return null;
  }

  const projects = await prisma.project.findMany({
    where: findUserProjects(user.id),
    include: {
      tasks: true,
    },
  });

  return projects;
};

export default async function Page() {
  const projects = await getProjects();

  return (
    <div className="h-full overflow-y-auto pr-6 w-full">
      <div className="h-full items-stretch justify-center min-h-[content]">
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingSkeleton />}>
            {/* @ts-expect-error Server Component */}
            <Greeting />
          </Suspense>
        </div>
        <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 mt-3 -m-3 ">
          {projects ? (
            projects.map((project) => {
              return (
                <div className="p-3" key={project.id}>
                  <Link href={`/project/${project.id}`}>
                    <ProjectCard project={project} />
                  </Link>
                </div>
              );
            })
          ) : (
            <Card>
              <h2 className="text-gray-300">No project yet</h2>
            </Card>
          )}
          <div className="p-3  flex justify-center items-center">
            <NewProject />
          </div>
        </div>
        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            <Suspense fallback={<TasksCardSkeleton />}>
              {/* @ts-ignore server component */}
              <TasksCard title="Recent tasks" />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
