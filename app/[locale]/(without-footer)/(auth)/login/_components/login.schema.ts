import { z } from "zod";

const passwordRules = z
  .string()
  .min(6, "Password must be at least 6 characters");
// .regex(/[a-z]/, "Password must contain at least one lowercase letter")
// .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
// .regex(/[0-9]/, "Password must contain at least one number");

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordRules,
});

export type LoginSchema = z.infer<typeof loginSchema>;
