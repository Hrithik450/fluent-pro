import { UsersModel } from "./users.model";
import {
  GetStudentsSearchParamsSchema,
  User,
  UserResponse,
  userSchema,
  UsersResponse,
} from "./users.types";

export class UsersService {
  static async createUser(data: Partial<User>): Promise<UserResponse> {
    try {
      const validateData = userSchema.parse(data);
      const existingUser = await UsersModel.getUserByEmail(validateData.email);
      if (existingUser)
        return {
          success: false,
          error: "User already exists",
        };

      const user = await UsersModel.createUser(validateData);
      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to create user",
      };
    }
  }

  static async getUserById(userId: string): Promise<UserResponse> {
    try {
      const user = await UsersModel.getUserById(userId);
      if (!user)
        return {
          success: false,
          error: "User not found",
        };

      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to get user by Id",
      };
    }
  }

  static async getUserByEmail(email: string): Promise<UserResponse> {
    try {
      const user = await UsersModel.getUserByEmail(email);
      if (!user)
        return {
          success: false,
          error: "User not found",
        };

      return { success: true, data: user };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to get user by email",
      };
    }
  }

  static async getUsers(
    input: GetStudentsSearchParamsSchema
  ): Promise<UsersResponse> {
    try {
      const users = await UsersModel.getUsers(input);
      return { success: true, data: users.data, pageCount: users.pageCount };
    } catch (error) {
      return { success: false, data: [], pageCount: 0 };
    }
  }
}
