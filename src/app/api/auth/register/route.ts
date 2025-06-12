import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { signUpSchema } from "@/lib/zodSchema";
import { UsersService } from "@/actions/users/users.service";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const validatedFields = signUpSchema.parse(data);

    const { password, ...rest } = validatedFields;
    const hashedPassword = await bcrypt.hash(password, 10);

    const response = await UsersService.createUser({
      ...rest,
      hashedPassword,
    });

    return NextResponse.json(
      { message: "User created successfully", data: response.data },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
