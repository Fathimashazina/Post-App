"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface UserResponse {
  user: string | null;
  error: AxiosError | null;
}
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        router.push("/");
        return;
      }
      setIsSuccess(true);
    })();
  }, [router]);
  if (!isSuccess) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-pink-200 pt-10">
        <p className="text-gray-800 text-2xl">Loading...</p>
      </div>
    );
  }
  return <main>{children}</main>;
}

async function getUser(): Promise<UserResponse> {
  try {
    const { data } = await axios.get("/api/auth/me");
    return {
      user: data,
      error: null,
    };
  } catch (e) {
    const error = e as AxiosError;
    return {
      user: null,
      error,
    };
  }
}
