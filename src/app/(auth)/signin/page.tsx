"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signIn } from "@/lib/auth-client";
import { GoogleIcon, GithubIcon } from "@/components/SocialIcons";
import { toast } from "sonner";

const inputClass = "w-full rounded-lg bg-gray-50 text-sm";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setLoading(true);

    try {
      const { error } = await signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      });

      if (error) {
        toast.error("ইমেইল বা পাসওয়ার্ড সঠিক নয়");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");

      router.replace("/");
      router.refresh();
    } catch {
      toast.error("সাইন ইন করতে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const socialSignIn = (provider: "google" | "github") => {
    signIn.social({ provider, callbackURL: "/" });
  };

  return (
    <div className="flex flex-col items-center px-4 py-8 md:py-12">
      {/* heading */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">সাইন ইন</h1>
        <p className="mt-1 text-xs md:text-sm text-gray-500">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>
      </div>

      {/* card */}
      <div className="mt-5 w-full max-w-md rounded-2xl border border-gray-200 bg-white/70 p-5 md:p-6 shadow-sm">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="email"
            type="email"
            validate={(value) =>
              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value) ? null : "সঠিক ইমেইল ঠিকানা দিন"
            }
          >
            <Label className="text-sm font-semibold">ইমেইল</Label>
            <Input className={inputClass} placeholder="you@example.com" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="password"
            type="password"
            validate={(value) => (value.length < 8 ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" : null)}
          >
            <Label className="text-sm font-semibold">পাসওয়ার্ড</Label>
            <Input className={inputClass} placeholder="কমপক্ষে ৮ অক্ষর" />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-lg bg-green-700 font-semibold text-white shadow-[0_6px_6px_-4px_rgba(21,128,61,0.8)] hover:bg-green-800"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
          </Button>
        </Form>

        {/* divider */}
        <div className="my-4 flex items-center gap-3 text-xs text-gray-500">
          <span className="h-px flex-1 bg-gray-200" />
          অথবা
          <span className="h-px flex-1 bg-gray-200" />
        </div>

        {/* social */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <Button
            type="button"
            variant="secondary"
            onPress={() => socialSignIn("google")}
            className="rounded-lg border border-gray-200 bg-white text-xs md:text-sm font-semibold"
          >
            <GoogleIcon />
            Google দিয়ে চালিয়ে যান
          </Button>
          <Button
            type="button"
            variant="secondary"
            onPress={() => socialSignIn("github")}
            className="rounded-lg border border-gray-200 bg-white text-xs md:text-sm font-semibold"
          >
            <GithubIcon />
            GitHub দিয়ে চালিয়ে যান
          </Button>
        </div>

        <p className="mt-4 text-center text-xs md:text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-semibold text-green-700 hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-5 text-xs md:text-sm text-gray-500 hover:text-green-700">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignInPage;
