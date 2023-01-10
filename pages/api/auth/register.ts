import { createJWT, hashPassword } from "@lib/auth";
import { prisma } from "@lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

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
  res.setHeader(
    "Set-Cookie",
    serialize(process.env.COOKIE_NAME!, jwt, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })
  );

  res.status(201).json({ user });
}
