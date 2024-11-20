"use client";
import Link from "next/link";

export default function Logo({ href }) {
  return (
    <Link
      href={href || "/"}
      className="w-full items-start text-3xl font-bold mb-5 flex justify-between"
    >
      <h1>
        <span className="text-secondary font-black">V</span> - Manager
      </h1>
    </Link>
  );
}
