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
      setAlert({ type: "error", message: error.message || "Login failed" });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-sky-200">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl block text-center font-semibold mb-3">
          <i className="fa-solid fa-user"></i> Login
        </h1>

        {alert && (
          <div
            className={`mt-4 p-3 rounded-md text-sm font-medium ${
              alert.type === "success"
                ? "bg-green-100 text-green-800 border border-green-400"
                : "bg-red-100 text-red-800 border border-red-400"
            }`}
          >
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="username" className="block text-base mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="
              w-full text-base px-2 py-1
              border-0 border-b border-gray-400
              focus:outline-none focus:ring-0
              focus:border-b-2 focus:border-gray-600"
              required
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="block text-base mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="
              w-full text-base px-2 py-1
              border-0 border-b border-gray-400
              focus:outline-none focus:ring-0
              focus:border-b-2 focus:border-gray-600"
              required
            />
          </div>
          <div className="mt-5"></div>
          <button
            type="submit"
            className="
            border-2 border-sky-400 
            bg-sky-400 text-white py-1 w-full 
            rounded-md hover:bg-transparent hover:text-gray-800 
            font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
