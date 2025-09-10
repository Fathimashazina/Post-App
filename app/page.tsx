"use client";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const { push } = useRouter();
  const [alert, setAlert] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = {
      username: event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    };
    try {
      const { data } = await axios.post("/api/auth/login", payload);
      setAlert({ type: "success", message: "Login successful!" });
      setTimeout(() => push("/dashboard"), 1500);
    } catch (e) {
      const error = e as AxiosError;
      setAlert({ type: "error", message: "Invalid Credentials"  });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-200 px-4">
      <div className="w-full max-w-sm p-6 shadow-lg bg-white rounded-lg">
        <h1 className="text-2xl md:text-3xl text-center font-semibold mb-5 flex items-center justify-center gap-2">
          <i className="fa-solid fa-user"></i>
          Login
        </h1>

        {alert && (
          <div
            className={`mt-4 p-3 rounded-md text-sm md:text-base font-medium ${
              alert.type === "success"
                ? "bg-green-100 text-green-800 border border-green-400"
                : "bg-red-100 text-red-800 border border-red-400"
            }`}
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm md:text-base mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full text-base px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm md:text-base mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full text-base px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>
          <button
            type="submit"
            className="border-2 border-pink-400 bg-pink-400 text-white py-2 w-full rounded-md hover:bg-transparent hover:text-gray-800 font-semibold transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
