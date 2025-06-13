import { signOut } from "next-auth/react";

export const logout = async () => {
  try {
    await signOut({ redirectTo: "/signin" });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
};
