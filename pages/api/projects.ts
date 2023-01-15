import { getUserFromCookie } from "@lib/auth";
import { prisma } from "@lib/db";
import { verifyJWT } from "@lib/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const user = await verifyJWT(req.cookies[process.env.COOKIE_NAME!]!);
  if (!user) {
    res.status(401).json({ message: "Not authenticated" });
    return;
  }

  const project = await prisma.project.create({
    data: {
      ...req.body,
      ownerId: user.id,
    },
  });

  return res.json(project);
}
