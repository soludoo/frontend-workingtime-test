import { z } from "zod";

const passwordRules = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number");

export const registerSchema = z
  .object({
    new_password: passwordRules,
    confirm_password: passwordRules,
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
