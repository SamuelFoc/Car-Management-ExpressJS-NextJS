"use client";
import { apiFetch } from "@/utils/apiFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormInput from "../ui/FormInput";
import Button from "../ui/Button";
import Logo from "../ui/Logo";
import Message from "../ui/Message";

export default function RegisterUser() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const passwordsMatch = password === confirmPassword && confirmPassword !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!passwordsMatch) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await apiFetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.message === "User registered successfully.") {
        throw new Error("Registration failed");
      }

      setSuccess(true);

      // Wait 2 seconds before redirecting
      setTimeout(() => {
        router.push("/home");
      }, 2000);
    } catch (err) {
      setError("Registration Failed!");
    }
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {success && (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-secondary text-4xl font-bold">
            Successfully registered!
          </h1>
          <p className="text-gray-500">Redirecting to Login page..</p>
        </div>
      )}
      {!success && (
        <div className="p-8 w-full max-w-md">
          <Logo />
          {error && <Message type={"error"}>{error}</Message>}
          <form className="text-gray-700 text-xl" onSubmit={handleSubmit}>
            <FormInput
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              req={true}
            >
              Email
            </FormInput>
            <FormInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              req={true}
            >
              Username
            </FormInput>
            <FormInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              req={true}
            >
              Password
            </FormInput>
            <div className="relative">
              <FormInput
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                req={true}
              >
                Confirm Password
              </FormInput>
              <span
                className={`absolute top-1/2 -right-10 transform text-lg ${
                  passwordsMatch ? "text-green-500" : "text-red-500"
                }`}
              >
                {passwordsMatch ? "✅" : confirmPassword && "❌"}
              </span>
            </div>
            <Button type="submit">Register</Button>
          </form>
          <p className="text-sm text-gray-600 mt-4">
            Already have an account?&ensp;
            <a href="/home" className="text-secondary-light hover:underline">
              Log In
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
