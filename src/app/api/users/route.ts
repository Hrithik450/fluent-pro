import { UsersService } from "@/actions/users/users.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (userId) {
      const response = await UsersService.getUserById(userId);
      if (!response.success) {
        return NextResponse.json({ error: response.error }, { status: 404 });
      }
      return NextResponse.json(response.data);
    }

    // const response = await UsersService.getUsers();
    // if (!response.success) {
    //   return NextResponse.json({ error: response.error }, { status: 500 });
    // }
    // return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
