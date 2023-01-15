import TasksCard from "@components/TasksCard";
import { getUserFromCookie } from "@lib/auth";
import { prisma } from "@lib/db";
import { cookies } from "next/headers";

const getProject = async (id: string) => {
  const user = await getUserFromCookie(cookies());
  if (!user) {
    return null;
  }

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    include: {
      tasks: true,
    },
  });

  if (!project || user.id !== project.ownerId) {
    return null;
  }

  return project;
};

const ProjectDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const project = await getProject(id);

  if (!project) {
    return <div>You can't view this project.</div>;
  }

  return (
    <div className="h-full">
      <h2 className="text-2xl m-4">{project.title}</h2>
      {/* @ts-ignore */}
      <TasksCard tasks={project.tasks} title={"All tasks"} />
    </div>
  );
};

export async function generateStaticParams() {
  const projects = await prisma.project.findMany();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default ProjectDetails;
