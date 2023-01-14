import { getUserFromCookie } from "@lib/auth";
import { prisma } from "@lib/db";
import { Task } from "@prisma/client";
import { cookies } from "next/headers";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { delay } from "@lib/utils";

const getTasks = async () => {
  await delay(1000);
  const user = await getUserFromCookie(cookies());
  const tasks = await prisma.task.findMany({
    where: {
      ownerId: user?.id,
      NOT: {
        status: "COMPLETED",
        isDeleted: true,
      },
    },
    take: 5,
    orderBy: {
      dueDate: "asc",
    },
  });

  return tasks;
};

const TasksCard = async ({
  tasks,
  title,
}: {
  tasks?: Task[];
  title: string;
}) => {
  const data = tasks || (await getTasks());

  if (!data) {
    return <div>no task available</div>;
  }

  return (
    <Card>
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl text-gray-600">{title}</span>
        </div>
        <div>
          <Button intent="text" className="text-violet-600">
            + Create New
          </Button>
        </div>
      </div>
      <div>
        <div>
          {data.map((task) => (
            <div className="py-2" key={task.id}>
              <div>
                <span className="text-gray-800">{task.title}</span>
              </div>
              <div>
                <span className="text-gray-400 text-sm">
                  {task.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TasksCard;
