import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcrypt";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import {
  RequestCookie,
  RequestCookies,
} from "next/dist/server/web/spec-extension/cookies";
import { Pause } from "react-feather";
import type { User } from "@prisma/client";
import { prisma } from "./db";

type UserPayload = {
  id: string;
};

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const createJWT = async (userPayload: UserPayload) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;

  return await new SignJWT(userPayload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

export const verifyJWT = async (token: string): Promise<UserPayload> => {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload as UserPayload;
};

export const getUserFromCookie = async (
  cookies: RequestCookies
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
