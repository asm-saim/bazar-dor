"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { toast } from "sonner";

export const useSignOut = () => {
  const router = useRouter();

  return async () => {
    const { error } = await signOut();
    if (error) {
      toast.warning("সাইন আউট করা যায়নি, আবার চেষ্টা করুন");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/signin");
    router.refresh();
  };
};
