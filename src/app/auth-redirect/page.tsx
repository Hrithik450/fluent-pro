import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AuthRedirectPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  const role = session.user.role;

  switch (role) {
    case "superAdmin":
      redirect("/a/dashboard");
    case "teacher":
      redirect("/t/dashboard");
    default:
      redirect("/");
  }
}
