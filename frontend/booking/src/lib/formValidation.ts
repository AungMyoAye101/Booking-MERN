import { z } from "zod";

export const loginUserValidation = z.object({
  username: z
    .string()
    .min(3, { message: "username contain at least 6 character" })
    .max(12, { message: "username doesn't exceed 12 character" }),
  password: z
    .string()
    .min(6, { message: "password contain at least 6 character" })
    .max(12, { message: "password doesn't exceed 12 character" }),
});
export const signUpUserValidation = z.object({
  username: z
    .string()
    .min(3, { message: "username contain at least 6 character" })
    .max(12, { message: "username doesn't exceed 12 character" }),
  password: z
    .string()
    .min(6, { message: "password contain at least 6 character" })
    .max(12, { message: "password doesn't exceed 12 character" }),
  email: z.string().email(),
});
