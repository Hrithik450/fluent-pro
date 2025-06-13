import { Home } from "@/components/student/home";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function UI() {
  const session = await auth();
  if (!session?.user) {
    return redirect("/signin");
  }

  return <Home email={session?.user.email} />;
}
