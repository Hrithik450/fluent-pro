import { db } from "@/lib/db";
import { NewUser, User } from "./users.types";
import { users } from "@/lib/drizzle/schema";
import { eq } from "drizzle-orm";

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

  static async getUsers(): Promise<User[] | null> {
    const result = await db.select().from(users);
    return result.length > 0 ? result : null;
  }
}
