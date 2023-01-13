import bcrypt from "bcrypt";
import { RequestCookies } from "next/dist/server/web/spec-extension/cookies";
import type { User } from "@prisma/client";
import { prisma } from "./db";
import { verifyJWT } from "./jwt";
import { ReadonlyRequestCookies } from "next/dist/server/app-render";

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const getUserFromCookie = async (
  cookies: RequestCookies | ReadonlyRequestCookies
): Promise<User | null> => {
  const token = cookies.get(process.env.COOKIE_NAME as string);
  if (token) {
    if (token.value) {
      const { id } = await verifyJWT(token.value as string);
      const user = await prisma.user.findUnique({ where: { id } });
      if (user) {
        return user;
      }
    }
  }

  return null;
};
