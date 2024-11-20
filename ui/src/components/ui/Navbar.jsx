"use client";
import { useState } from "react";
import Logo from "./Logo";

export default function NavBar({ href }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const logout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      window.location.reload();
    }, 2000); // 2 seconds delay
  };

  return (
    <nav className="w-full items-start text-3xl font-bold mb-5 flex justify-between">
      <Logo href={href || "/"} />
      <div
        onMouseEnter={() => setTooltipVisible(true)}
        onMouseLeave={() => setTooltipVisible(false)}
        onClick={logout}
        className="hover:cursor-pointer flex items-center transition duration-1000"
      >
        <div
          className={`transition-transform duration-200 ${
            tooltipVisible ? "translate-x-[-5rem]" : ""
          }`}
        >
          {isLoggingOut ? (
            <h6 className="w-40 text-lg">🔐 Logging out...</h6>
          ) : tooltipVisible ? (
            "🔒"
          ) : (
            "🔓"
          )}
        </div>
        <span
          className={`absolute w-28 text-secondary text-lg transition duration-200 ${
            tooltipVisible ? "translate-x-[-2rem] opacity-100" : "opacity-0"
          }`}
        >
          Log me out
        </span>
      </div>
    </nav>
  );
}