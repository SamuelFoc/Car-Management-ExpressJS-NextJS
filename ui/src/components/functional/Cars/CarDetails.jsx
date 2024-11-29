"use client";
import { apiFetch } from "@/utils/apiFetch";
import { useEffect, useState } from "react";
import BackButton from "@/components/ui/BackButton";
import CarDetailBlock from "./CarDetailBlock";
import Row from "@/components/ui/Row";
import Title from "@/components/ui/Title";

export default function CarDetails({ carId }) {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const res = await apiFetch(`/cars/${carId}`);
        setData(res?.car);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchCarData();
  }, []);

  return (
    <>
      <Row>
        <Title subtitle={data?.year}>{data?.make + " " + data?.model}</Title>
        <BackButton>◀</BackButton>
      </Row>
      <CarDetailBlock
        image={"/info-icon.png"}
        carId={carId}
        details={[
          {
            label: "License Plate",
            key: "licensePlate",
            data: data?.licensePlate,
          },
          {
            label: "VIN",
            key: "vin",
            data: data?.vin,
          },
          {
            label: "Mileage [km]",
            key: "mileage",
            data: data?.mileage,
          },
        ]}
      />
      <CarDetailBlock
        image={"/engine-icon.png"}
        carId={carId}
        details={[
          {
            label: "Engine",
            key: "engine",
            data: data?.engine,
          },
          {
            label: "Engine Power [HP]",
            key: "enginePower",
            data: data?.enginePower,
          },
        ]}
      />
      <CarDetailBlock
        image={"/wheel-icon.png"}
        carId={carId}
        details={[
          {
            label: "Powered Wheels",
            key: "powerWheels",
            data: data?.powerWheels,
            selection: [
              { value: "Front", label: "Front" },
              { value: "Rear", label: "Rear" },
              { value: "All", label: "All" },
            ],
          },
          {
            label: "Drivetrain",
            key: "drivetrain",
            data: data?.drivetrain,
            selection: [
              { value: "4WD", label: "4WD" },
              { value: "2WD", label: "2WD" },
            ],
          },
        ]}
      />
    </>
  );
}
