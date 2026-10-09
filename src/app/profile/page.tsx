"use client";

import { useState } from "react";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { updateUser, useSession } from "@/lib/auth-client";
import { validateName } from "@/lib/auth-helpers";
import { useSignOut } from "@/lib/use-sign-out";
import { ProfileSkeleton } from "@/components/AuthSkeleton";
import { toast } from "sonner";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const signOut = useSignOut();
  const [loading, setLoading] = useState(false);

  if (isPending) return <ProfileSkeleton />;
  if (!session) return null; // proxy.ts already redirects logged-out users

  const { user } = session;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();

    const invalid = validateName(name);
    if (invalid) {
      toast.warning(invalid);
      return;
    }

    setLoading(true);
    const { error } = await updateUser({ name });
    setLoading(false);

    if (error) {
      toast.warning(error.message ?? "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
  };

  return (
    <section className="max-w-3xl mx-auto px-3 md:px-4 py-6 md:py-10 space-y-4">
      {/* heading */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mt-1 text-xs md:text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
      </div>

      {/* user card */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white/70 p-4 md:p-5 shadow-sm">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          {user.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-xl object-cover"
            />
          ) : (
            <span className="flex h-14 w-14 md:h-16 md:w-16 shrink-0 items-center justify-center rounded-xl bg-green-700 text-xl font-bold text-white">
              {user.name.charAt(0)}
            </span>
          )}
          <div className="min-w-0">
            <p className="truncate text-base md:text-lg font-semibold">{user.name}</p>
            <p className="truncate text-xs md:text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={signOut}
          className="rounded-lg border border-red-500 px-4 py-2 text-xs md:text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          ↩ সাইন আউট
        </button>
      </div>

      {/* info card */}
      <div className="rounded-2xl border border-gray-200 bg-white/70 p-4 md:p-5 shadow-sm">
        <h2 className="text-base md:text-lg font-bold">তথ্য</h2>

        <Form className="mt-4 flex flex-col gap-4" onSubmit={onSubmit} validationBehavior="aria">
          <TextField name="name" defaultValue={user.name} validate={validateName}>
            <Label className="text-sm font-semibold">নাম</Label>
            <Input className="w-full rounded-lg bg-gray-50 text-sm" placeholder="আপনার নাম" />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-lg bg-green-700 font-semibold text-white shadow-[0_6px_6px_-4px_rgba(21,128,61,0.8)] hover:bg-green-800"
          >
            {loading ? "অপেক্ষা করুন..." : "আপডেট"}
          </Button>
        </Form>
      </div>
    </section>
  );
};

export default ProfilePage;
