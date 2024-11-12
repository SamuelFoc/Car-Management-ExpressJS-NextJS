"use client";
import { apiFetch } from "@/utils/apiFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await apiFetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.message === "Login successful") {
        throw new Error("Login failed");
      }

      const { token } = response;
      localStorage.setItem("token", token); // Store JWT in localStorage
      router.push("/home");
    } catch (err) {
      setError("Login Failed!");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold mb-4">
          <span className="text-secondary font-black">V</span> - Manage
        </h1>
        {error && <p className="py-2 text-red-500 text-sm">{error}</p>}
        <form className="text-gray-700 text-xl">
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="w-full flex justify-center p-4">
            <button
              onClick={handleSubmit}
              className="w-full max-w-52 bg-secondary text-primary font-black py-2 rounded hover:bg-primary-dark"
            >
              Login
            </button>
          </div>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-primary hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
