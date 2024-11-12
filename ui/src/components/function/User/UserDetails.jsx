"use client";
import Block from "@/components/layout/block/Block";
import { apiFetch } from "@/utils/apiFetch";
import { useEffect, useState } from "react";

export default function UserDetails() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await apiFetch("/users/info");
        setUserData(res);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <Block>
      <h3 className="w-full items-start">
        <strong>username:&ensp;</strong>
        <span className="text-slate-400">{userData?.user?.username}</span>
      </h3>
      <h3 className="w-full items-center">
        <strong>e-mail:&ensp;</strong>
        <span className="text-slate-400">{userData?.user?.email}</span>
      </h3>
    </Block>
  );
}
