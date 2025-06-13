import { Home } from "@/components/student/home";
import { auth } from "@/lib/auth";

export default async function UI() {
  const session = await auth();
  return <Home email={session?.user.email} />;
}
