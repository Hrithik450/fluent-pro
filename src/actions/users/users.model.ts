import { db } from "@/lib/db";
import { GetStudentsSearchParamsSchema, NewUser, User } from "./users.types";
import { users } from "@/lib/drizzle/schema";
import { and, eq, ilike, count, gt } from "drizzle-orm";
import { unstable_cache } from "next/cache";

export class UsersModel {
  static async createUser(data: NewUser): Promise<User> {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  static async getUserById(userId: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    return user || null;
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);
    return user || null;
  }

  static async getUsers(input: GetStudentsSearchParamsSchema) {
    const getCachedUsers = unstable_cache(
      async () => {
        try {
          const offset = (input.page - 1) * input.perPage;
          const fromDate = input.from ? new Date(input.from) : undefined;
          const toDate = input.to ? new Date(input.to) : undefined;

          const where = and(
            input.id ? ilike(users.id, `%${input.id}%`) : undefined,
            input.name ? ilike(users.name, `%${input.name}%`) : undefined,
            input.email ? ilike(users.email, `%${input.email}%`) : undefined,
            input.userType
              ? ilike(users.userType, `%${input.userType}%`)
              : undefined
            // fromDate ? gte(users.createdAt, fromDate) : undefined,
            // toDate ? lte(users.createdAt, toDate) : undefined
          );

          const { data, total } = await db.transaction(async (tx) => {
            const data = await tx
              .select({
                id: users.id,
                name: users.name,
                email: users.email,
                image: users.image,
                emailVerified: users.emailVerified,
                userType: users.userType,
                dateOfBirth: users.dateOfBirth,
                lastLogin: users.lastLogin,
                isActive: users.isActive,
              })
              .from(users)
              .limit(input.perPage)
              .offset(offset)
              .where(where);

            const total = await tx
              .select({
                count: count(),
              })
              .from(users)
              .where(where)
              .execute()
              .then((res) => res[0]?.count ?? 0);

            return { data, total };
          });

          const pageCount = Math.ceil(total / input.perPage);
          return { data, pageCount };
        } catch (error) {
          console.log(error);
          return { data: [], pageCount: 0 };
        }
      },
      [JSON.stringify(input)],
      {
        revalidate: 3600,
        tags: ["users"],
      }
    );
    return await getCachedUsers();
  }

  static async getUsersIdCount() {
    const cachedResult = unstable_cache(
      async () => {
        try {
          return await db
            .select({
              status: users.id,
              count: count(),
            })
            .from(users)
            .groupBy(users.id)
            .having(gt(count(), 0))
            .then((res) =>
              res.reduce((acc, { status, count }) => {
                acc[status] = count;
                return acc;
              }, {} as Record<User["id"], number>)
            );
        } catch (error) {
          console.log(error);
          return {} as Record<User["id"], number>;
        }
      },
      ["users-count"],
      {
        revalidate: 3600,
      }
    );

    return await cachedResult();
  }
}
