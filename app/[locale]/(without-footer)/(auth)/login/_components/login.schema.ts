import { z } from "zod";

const passwordRules = z
  .string()
  .min(6, "Password must be at least 6 characters");

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: passwordRules,
});

export type LoginSchema = z.infer<typeof loginSchema>;
