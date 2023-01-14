import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  res.setHeader("Set-Cookie", [
    serialize(process.env.COOKIE_NAME!, "", {
      maxAge: -1,
      path: "/",
    }),
  ]);

  return res.json({ data: "logged out" });
}
