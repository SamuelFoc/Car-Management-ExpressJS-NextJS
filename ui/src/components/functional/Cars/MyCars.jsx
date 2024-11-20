"use client";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/apiFetch";
import Block from "@/components/layout/block/Block";
import Car from "./Car";
import AddCar from "@/components/functional/Cars/AddCar";
import ResponsiveGrid from "@/components/ui/ResponsiveGrid";

export default function MyCars() {
  const [userCarsData, setUserCarsData] = useState();

  useEffect(() => {
    const fetchUserCars = async () => {
      try {
        const res = await apiFetch("/users/info");
        setUserCarsData(res);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchUserCars();
  }, []);

  return (
    <Block title={"My Cars"} gap={5}>
      <AddCar />
      <ResponsiveGrid>
        {userCarsData?.user?.Cars?.map((car) => {
          return <Car key={car?.id} car={car} />;
        })}
      </ResponsiveGrid>
    </Block>
  );
}
