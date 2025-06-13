"use client";
import { logout } from "@/actions/auth/sign-out";
import { Button } from "@/components/ui/button";

export function Home({ email }: { email: string }) {
  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome, {email}!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            This is your protected home page.
          </p>
          <div className="mt-8">
            <Button
              type="submit"
              onClick={handleSignOut}
              className={`w-[max-content] rounded-full px-8 py-6 text-md cursor-pointer`}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
