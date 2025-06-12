import { users } from "@/lib/drizzle/schema";
import { z } from "zod";

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const userSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name cannot exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(50, "Email cannot exceed 100 characters"),
  emailVerified: z.date().nullable().optional(),
  hashedPassword: z.string(),
  image: z.string().url("Invalid image URL").nullable().optional(),
  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .nullable()
    .optional(),
  userType: z
    .enum(["superAdmin", "schoolAdmin", "teacher", "student"])
    .default("student"),
});

export type UserResponse = {
  success: boolean;
  data?: User;
  error?: string;
};

export type UsersResponse = {
  success: boolean;
  data?: User[] | null;
  error?: string;
  pageCount: number | null;
};
