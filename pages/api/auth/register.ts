import { createJWT, hashPassword } from "@lib/auth";
import { prisma } from "@lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const hashedPassword = await hashPassword(req.body.password);
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      password: hashedPassword,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    },
  });
  const jwt = await createJWT({ id: user.id });
  res.status(200).json({ name: jwt });
}
