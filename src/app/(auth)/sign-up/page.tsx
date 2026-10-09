"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { signIn, signUp } from "@/lib/auth-client";

const GoogleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    />
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
    />
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    />
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

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
