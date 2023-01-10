import { prisma } from "@lib/db";
import { TASK_STATUS } from "@prisma/client";

const generateProjects = () => {
  return new Array(5).fill(1).map((_, i) => ({
    title: `Project ${i}`,
    dueDate: new Date(2022, 11, 25),
  }));
};

const generateTasks = (ownerId: string, projectId: string, index: number) => {
  return {
    title: `Task ${index}`,
    ownerId,
    projectId,
    description: `Everything that describes Task ${index}`,
    status: getRandomTaskStatus(),
  };
};

const getRandomTaskStatus = () => {
  const statuses = [
    TASK_STATUS.COMPLETED,
    TASK_STATUS.NOT_STARTED,
    TASK_STATUS.STARTED,
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const main = async () => {
  const user = await prisma.user.upsert({
    where: {
      email: "qq@qq.com",
    },
    update: {},
    create: {
      email: "qq@qq.com",
      password: "test",
      projects: {
        create: generateProjects(),
      },
    },
    include: {
      projects: true,
    },
  });
  const tasks = await Promise.all(
    user.projects.map((project) =>
      prisma.task.createMany({
        data: new Array(10)
          .fill(1)
          .map((_, i) => generateTasks(user.id, project.id, i)),
      })
    )
  );
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
