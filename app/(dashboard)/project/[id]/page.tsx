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

export const ProjectDetails = async ({
  params,
}: {
  params: { id: string };
}) => {
  const { id } = params;
  const project = await getProject(id);

  if (!project) {
    return <div>You can't view this project.</div>;
  }

  return (
    <div>
      <h1>{project.title}</h1>
    </div>
  );
};

export async function generateStaticPaths() {
  const projectIds = await (
    await prisma.project.findMany()
  ).map((project) => project.id);
  return projectIds.map((id) => ({
    params: {
      id,
    },
  }));
}

export default ProjectDetails;
