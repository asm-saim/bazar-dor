"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { toast } from "sonner";
import { updateUser, useSession } from "@/lib/auth-client";
import { validateName } from "@/lib/auth-helpers";
import { ProfileSkeleton } from "@/components/AuthSkeleton";

const UpdateForm = ({ currentName }: { currentName: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();

    const invalid = validateName(name);
    if (invalid) {
      toast.error(invalid);
      return;
    }

    setLoading(true);
    const id = toast.loading("আপডেট হচ্ছে...");
    const { error } = await updateUser({ name });
    setLoading(false);

    if (error) {
      toast.error(error.message ?? "তথ্য আপডেট করা যায়নি", { id });
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে", { id });
    router.push("/profile");
  };

  return (
    <section className="max-w-3xl mx-auto px-3 md:px-4 py-6 md:py-10 space-y-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">তথ্য আপডেট করুন</h1>
        <p className="mt-1 text-xs md:text-sm text-gray-500">আপনার নাম পরিবর্তন করুন।</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white/70 p-4 md:p-5 shadow-sm">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit} validationBehavior="aria">
          <TextField name="name" defaultValue={currentName} validate={validateName}>
            <Label className="text-sm font-semibold">নাম</Label>
            <Input className="w-full rounded-lg bg-gray-50 text-sm" placeholder="আপনার নাম" />
            <FieldError />
          </TextField>

          <Button
            type="submit"
            isDisabled={loading}
            className="w-full rounded-lg bg-green-700 font-semibold text-white shadow-[0_6px_6px_-4px_rgba(21,128,61,0.8)] hover:bg-green-800"
          >
            {loading ? "অপেক্ষা করুন..." : "তথ্য আপডেট করুন"}
          </Button>
        </Form>

        <Link href="/profile" className="mt-4 inline-block text-xs md:text-sm text-gray-500 hover:text-green-700">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </section>
  );
};

const UpdateProfilePage = () => {
  const { data: session, isPending } = useSession();

  if (isPending) return <ProfileSkeleton />;
  if (!session) return null; // proxy.ts already redirects logged-out users

  return <UpdateForm currentName={session.user.name} />;
};

export default UpdateProfilePage;
