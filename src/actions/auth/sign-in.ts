import { signInSchema, TSignInSchema } from "@/lib/zodSchema";
import { signIn } from "next-auth/react";

export const login = async (values: TSignInSchema) => {
  const validatedFields = signInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { success: false, error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/auth-redirect",
    });
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected error",
    };
  }
};
