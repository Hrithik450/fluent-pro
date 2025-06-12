import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import { UsersService } from "@/actions/users/users.service";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "./zodSchema";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const validatedFields = signInSchema.safeParse(credentials);
        if (!validatedFields.success) {
          console.error("Validation failed", validatedFields.error);
          return null;
        }

        const { email, password } = validatedFields.data;
        const response = await UsersService.getUserByEmail(email);

        if (!response.success || !response.data) {
          console.error("User not found or service failed", response);
          return null;
        }

        const user = response.data;
        const isMatch = await bcrypt.compare(password, user.hashedPassword);

        if (!isMatch) {
          console.error("Password mismatch");
          return null;
        }

        return { id: user.id, email: user.email, role: user.userType };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
