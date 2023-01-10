import { SignJWT, jwtVerify } from "jose";

type UserPayload = {
  id: string;
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
