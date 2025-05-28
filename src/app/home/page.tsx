import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/SignOutButton";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome, {session.user.email}!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            This is your protected home page.
          </p>
          <div className="mt-8">
            <SignOutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
