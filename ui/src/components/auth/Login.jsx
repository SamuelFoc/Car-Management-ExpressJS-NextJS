"use client";
import { apiFetch } from "@/utils/apiFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import Message from "../ui/Message";

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
        <Logo />
        <Message type={"error"}>{error}</Message>
        <form className="text-gray-700 text-xl">
          <FormInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            req={true}
          >
            Email
          </FormInput>
          <FormInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            req={true}
          >
            Password
          </FormInput>
          <Button onClick={handleSubmit}>Login</Button>
        </form>
        <p className="text-sm text-gray-600 mt-4">
          Don’t have an account?&ensp;
          <a href="/register" className="text-secondary-light hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
