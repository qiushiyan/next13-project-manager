import { hashPassword } from "@lib/auth";
import { prisma } from "@lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";
import { createJWT } from "@lib/jwt";
import { Prisma } from "@prisma/client";
import { errToString } from "@lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const hashedPassword = await hashPassword(req.body.password);
  try {
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

    res.status(201).json({ data: user });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        res
          .status(409)
          .json({ message: `Email ${req.body.email} already in use` });
        return;
      }
    }
    res.status(500).json({ message: errToString(err) });
  }
}
