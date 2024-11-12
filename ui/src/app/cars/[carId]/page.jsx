"use client";
import CarDetailBlock from "@/components/function/Cars/CarDetailBlock";
import Container from "@/components/layout/container/Container";
import { apiFetch } from "@/utils/apiFetch";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CarDetails() {
  const { carId } = useParams();
  const [carDetails, setCarDetails] = useState();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await apiFetch(`/cars/${carId}`);
        setCarDetails(res?.car);
        console.log(res);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchCarDetails();
  }, []);

  return (
    <Container>
      <h1 className="text-2xl font-bold">
        <strong>{carDetails?.make}</strong>&ensp;
        <strong>{carDetails?.model}</strong>&ensp;
        <span className="opacity-40">({carDetails?.year})</span>
      </h1>
      <CarDetailBlock
        image={"/info_icon.png"}
        details={{
          License: carDetails?.licensePlate,
          VIN: carDetails?.vin,
          Mileage: carDetails?.mileage,
        }}
      />
      <CarDetailBlock
        image={"/engine_icon.png"}
        details={{ Engine: carDetails?.engine }}
      />
      <CarDetailBlock
        image={"/wheel_icon.png"}
        details={{
          Powered_wheels: carDetails?.powerWheels,
          Drivetrain: carDetails?.drivetrain,
        }}
      />
    </Container>
  );
}
