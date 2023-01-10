import { comparePassword } from "@lib/auth";
import { prisma } from "@lib/db";
import { createJWT } from "@lib/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(400).json({ message: "user not found with email" });
    return;
  }
  const isPassword = await comparePassword(password, user.password);
  if (!isPassword) {
    res.status(400).json({ message: "incorrectp assword" });
    return;
  }

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
