import { delay } from "@lib/utils";
import { prisma, findUserProjects } from "@lib/db";
import { User } from "@prisma/client";
import Link from "next/link";
import ProjectCard from "./ProjectCard";
import Card from "./ui/Card";
import { getUserFromCookie } from "@lib/auth";
import { cookies } from "next/headers";

const getProjects = async (uid: string) => {
  await delay(1000);
  const projects = await prisma.project.findMany({
    where: findUserProjects(uid),
    include: {
      tasks: true,
    },
  });

  return projects;
};

export const getUser = async () => {
  await delay(1000);
  const user = await getUserFromCookie(cookies());
  return user;
};

const ProjectGrid = async () => {
  const user = await getUser();
  if (!user) {
    return <div>no projects available</div>;
  }
  const projects = await getProjects(user.id);

  if (projects.length === 0) {
    return (
      <Card>
        <h2 className="text-gray-300">No project yet</h2>
      </Card>
    );
  }

  return projects.map((project) => (
    <div className="w-1/3 p-3">
      <Link href={`/project/${project.id}`}>
        <ProjectCard project={project} />
      </Link>
    </div>
  ));
};

export default ProjectGrid;
