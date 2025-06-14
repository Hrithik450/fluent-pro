import { users } from "@/lib/drizzle/schema";
import { commonParsers } from "@/lib/table/validation";
import {
  createSearchParamsCache,
  parseAsString,
  parseAsTimestamp,
} from "nuqs/server";
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
  data?: Omit<User, "hashedPassword">[];
  error?: string;
  pageCount: number;
};

export const studentSearchParamCache = createSearchParamsCache({
  ...commonParsers,
  id: parseAsString.withDefault(""),
  userId: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
  email: parseAsString.withDefault(""),
  from: parseAsString.withDefault(""),
  to: parseAsString.withDefault(""),
  userType: parseAsString.withDefault(""),
  dateOfBirth: parseAsString.withDefault(""),
});

export type GetStudentsSearchParamsSchema = Awaited<
  ReturnType<typeof studentSearchParamCache.parse>
>;
