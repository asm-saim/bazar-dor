"use client";

import { useRouter } from "next/navigation";
import { toast } from "@heroui/react";
import { signOut } from "@/lib/auth-client";

export const useSignOut = () => {
  const router = useRouter();

  return async () => {
    const { error } = await signOut();
    if (error) {
      toast.danger("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/signin");
    router.refresh();
  };
};
