import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export type TSignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  userType: z
    .enum(["superAdmin", "schoolAdmin", "teacher", "student"])
    .optional(),
});
export type TSignUpSchema = z.infer<typeof signUpSchema>;
