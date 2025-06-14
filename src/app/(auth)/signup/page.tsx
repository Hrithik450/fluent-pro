import { auth } from "@/lib/auth";
import { SignUpForm } from "@/components/auth/sign-up-form";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await auth();
  if (session) return redirect("/");

  return <SignUpForm />;
}
