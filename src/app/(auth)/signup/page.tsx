"use client";
import bcrypt from "bcryptjs";
import { signUpSchema, TSignUpSchema } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth/sign-in";
import { getSession } from "next-auth/react";

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error]);

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const response = await login({
          email: data.email,
          password: data.password,
        });

        if (response.success) {
          const session = await getSession();

          if (session && session.user.role === "superAdmin") {
            router.push("/a/dashboard");
          } else if (session && session.user.role === "teacher") {
            router.push("/t/dashboard");
          } else {
            router.push("/");
          }
        } else {
          setError("Invalid Credentials");
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-h-screen flex items-center justify-center bg-white"
      >
        <div className="w-full max-w-sm p-6 space-y-6">
          <h2 className="text-3xl font-semibold text-center text-black pb-3">
            Create an account
          </h2>

          {error && (
            <div className="text-red-500 bg-red-100 py-2 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl className="relative">
                  <div className="rounded-full">
                    <Input
                      disabled={loading}
                      className="peer rounded-full px-5 py-6 h-14 w-full text-sm placeholder-transparent focus:outline-none focus:ring-2"
                      placeholder=" "
                      {...field}
                    />
                    <label
                      className="absolute left-6 text-gray-400 top-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out 
      peer-placeholder-shown:top-1/2 
      peer-placeholder-shown:text-base 
      peer-focus:top-0 peer-focus:bg-white peer-focus:px-1 peer-focus:text-sm 
      peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:text-sm"
                    >
                      Name
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl className="relative rounded-full">
                  <div className="rounded-full">
                    <Input
                      disabled={loading}
                      className="peer rounded-full px-5 py-6 h-14 w-full text-sm placeholder-transparent focus:outline-none focus:ring-2"
                      placeholder=" "
                      {...field}
                    />
                    <label
                      className="absolute left-6 text-gray-400 top-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out 
      peer-placeholder-shown:top-1/2 
      peer-placeholder-shown:text-base 
      peer-focus:top-0 peer-focus:bg-white peer-focus:px-1 peer-focus:text-sm 
      peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:text-sm"
                    >
                      Email Address
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      disabled={loading}
                      type={showPassword ? "text" : "password"}
                      {...field}
                      placeholder=" "
                      className="peer rounded-full px-5 py-6 h-14 w-full text-sm placeholder-transparent focus:outline-none focus:ring-2"
                    />

                    <span className="text-gray-700 absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer z-10">
                      {showPassword ? (
                        <EyeOff
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <Eye onClick={() => setShowPassword(!showPassword)} />
                      )}
                    </span>

                    {/* Floating Label */}
                    <label
                      className="absolute left-6 text-gray-400 top-1/2 -translate-y-1/2 transition-all duration-200 ease-in-out 
      peer-placeholder-shown:top-1/2 
      peer-placeholder-shown:text-base 
      peer-focus:top-0 peer-focus:bg-white peer-focus:px-1 peer-focus:text-sm
      peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:bg-white peer-not-placeholder-shown:px-1 peer-not-placeholder-shown:text-sm"
                    >
                      Password
                    </label>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            disabled={loading}
            type="submit"
            className={`w-full rounded-full px-5 py-6 text-md cursor-pointer ${
              loading ? "disabled:opacity-75" : ""
            }`}
          >
            {loading ? "Signing..." : "Sign Up"}
          </Button>

          <div className="text-center text-md font-semibold text-gray-600">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </div>
        </div>
      </form>
    </Form>
  );
}
