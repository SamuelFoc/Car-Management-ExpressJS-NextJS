"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Heading({ href }) {
  const router = useRouter();
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <Link
      href={href || "/"}
      className="w-full items-start text-3xl font-bold mb-5 flex justify-between"
    >
      <h1>
        <span className="text-secondary font-black">V</span> - Manager
      </h1>
      <div onClick={logout}>🚪</div>
    </Link>
  );
}
