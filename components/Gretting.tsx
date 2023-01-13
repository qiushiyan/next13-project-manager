import { getUserFromCookie } from "@lib/auth";
import { prisma } from "@lib/db";
import { delay } from "@lib/utils";
import Card from "./ui/Card";
import Link from "next/link";
import Button from "./ui/Button";
import { cookies } from "next/headers";

export const getUser = async () => {
  await delay(1000);
  const user = await getUserFromCookie(cookies());
  return user;
};

const Greeting = async () => {
  const user = await getUser();
  if (!user) {
    return (
      <div>
        <Link href="/login">login</Link>
      </div>
    );
  }

  return (
    <Card className="w-full py-4 relative">
      <div className="mb-4">
        <h1 className="text-3xl text-gray-700 mb-4">
          Hello, {`${user.firstName} ${user.lastName}`}!
        </h1>
        <h4 className="text-xl text-gray-400">
          Check your daily tasks and schedule
        </h4>
      </div>
      <div>
        <Button size="large">Today's Schedule</Button>
      </div>
    </Card>
  );
};

export default Greeting;
