"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signIn, signUp } from "@/lib/auth-client";
import { GoogleIcon, GithubIcon } from "@/components/SocialIcons";

const inputClass = "w-full rounded-lg bg-gray-50 text-sm";

const SignUpPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");

    setLoading(true);
    const { error } = await signUp.email({
      name,
      email,
      password,
      callbackURL: "/",
    });
    setLoading(false);

    if (error) {
      setError(error.message ?? "কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      return;
    }

    router.push("/");
    router.refresh();
  };

  const socialSignIn = (provider: "google" | "github") => {
    signIn.social({ provider, callbackURL: "/" });
  };

  return (
    <div className="flex flex-col items-center px-4 py-8 md:py-12">
      {/* heading */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="mt-1 text-xs md:text-sm text-gray-500">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>
      </div>

      {/* card */}
      <div className="mt-5 w-full max-w-md rounded-2xl border border-gray-200 bg-white/70 p-5 md:p-6 shadow-sm">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <TextField
            isRequired
            name="name"
            validate={(value) => (value.trim().length < 2 ? "নাম কমপক্ষে ২ অক্ষরের হতে হবে" : null)}
          >
            <Label className="text-sm font-semibold">নাম</Label>
            <Input className={inputClass} placeholder="যেমন: রহিম উদ্দিন" />
            <FieldError />
          </TextField>

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
            value={password}
            onChange={setPassword}
            validate={(value) => (value.length < 8 ? "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে" : null)}
          >
            <Label className="text-sm font-semibold">পাসওয়ার্ড</Label>
            <Input className={inputClass} placeholder="কমপক্ষে ৮ অক্ষর" />
            <FieldError />
          </TextField>

          <TextField
            isRequired
            name="confirmPassword"
            type="password"
            value={confirm}
            onChange={setConfirm}
            validate={(value) => (value !== password ? "পাসওয়ার্ড মিলছে না" : null)}
          >
            <Label className="text-sm font-semibold">পাসওয়ার্ড নিশ্চিত করুন</Label>
            <Input className={inputClass} placeholder="আবার লিখুন" />
            <FieldError />
          </TextField>

          {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-xs md:text-sm text-red-600">{error}</p>}

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-lg bg-green-700 font-semibold text-white shadow-[0_6px_6px_-4px_rgba(21,128,61,0.8)] hover:bg-green-800"
          >
            {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
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
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/sign-in" className="font-semibold text-green-700 hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <Link href="/" className="mt-5 text-xs md:text-sm text-gray-500 hover:text-green-700">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};

export default SignUpPage;
