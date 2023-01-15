import { Prisma } from "@prisma/client";
import Card from "./ui/Card";
import { formatDate } from "@lib/utils";
import clsx from "clsx";
import { projectWithCards } from "@lib/db";

type ProjectWithCards = Prisma.ProjectGetPayload<typeof projectWithCards>;

const ProjectCard = ({ project }: { project: ProjectWithCards }) => {
  const taskCounts = project.tasks.reduce(
    (arr, task) => {
      if (task.status === "COMPLETED") {
        arr.completed += 1;
      }
      arr.total += 1;
      return arr;
    },
    { completed: 0, total: 0 }
  );
  const progress =
    taskCounts.total === 0
      ? 0
      : Math.ceil((taskCounts.completed / taskCounts.total) * 100);

  return (
    <Card className="px-6 py-8 hover:scale-105 hover:shadow-lg transition-all ease-in-out duration-200">
      <div>
        <span className="text-sm text-gray-300">
          {formatDate(project.createdAt)}
        </span>
      </div>
      <div className="mb-6">
        <span className="text-3xl text-gray-600">{project.title}</span>
      </div>
      <div className="mb-2">
        <span className="text-gray-400">
          {taskCounts.completed}/{project.tasks.length} completed
        </span>
      </div>
      <div>
        <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
          <div
            className={clsx(
              "h-full text-center text-xs text-white bg-violet-600 rounded-full "
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-right">
          <span className="text-sm text-gray-600 font-semibold">
            {progress}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
