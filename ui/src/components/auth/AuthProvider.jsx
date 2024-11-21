"use client";
import { apiFetch } from "@/utils/apiFetch";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // Redirect to login if no token
    } else {
      validateToken(token);
    }
  }, [router]);

  const validateToken = async (token) => {
    try {
      const response = await apiFetch("/auth/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.decoded) {
        throw new Error("Token is not valid!");
      }
      setIsAuthenticated(true); // Token is valid
    } catch (err) {
      localStorage.removeItem("token");
      router.push("/"); // Redirect to login on invalid token
    }
  };

  // Render children only if authenticated
  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        ⏳ Loading...
      </div>
    );
  }

  return <>{children}</>;
}
