import Card from "./ui/Card";

const TasksCardSkeleton = () => {
  return (
    <Card className="w-full py-14">
      <div className="animate-pulse flex flex-col gap-8">
        {Array(5)
          .fill(1)
          .map(() => {
            return <div className="rounded-full bg-gray-200 w-full h-10 p-4" />;
          })}
      </div>
    </Card>
  );
};

export default TasksCardSkeleton;
