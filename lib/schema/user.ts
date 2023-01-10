import { z } from "zod";

export const UserSchema = z.object({
  email: z.string(),
  password: z.string().min(6),
  firstName: z.string(),
  lastName: z.string(),
});
