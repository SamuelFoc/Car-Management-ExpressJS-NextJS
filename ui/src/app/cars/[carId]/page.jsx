"use client";
import CarDetailBlock from "@/components/function/Cars/CarDetailBlock";
import Container from "@/components/layout/container/Container";
import { apiFetch } from "@/utils/apiFetch";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CarDetails() {
  const { carId } = useParams();
  const router = useRouter();
  const [carDetails, setCarDetails] = useState();

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const res = await apiFetch(`/cars/${carId}`);
        setCarDetails(res?.car);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchCarDetails();
  }, []);

  const goBack = () => {
    router.back();
  };

  return (
    <Container>
      <div className="flex justify-evenly items-center">
        <div className="font-bold text-2xl" onClick={goBack}>
          ⏪
        </div>
        <div>
          <h1 className="text-2xl font-bold">
            <strong>{carDetails?.make}</strong>&ensp;
            <strong>{carDetails?.model}</strong>&ensp;
            <span className="opacity-40">({carDetails?.year})</span>
          </h1>
        </div>
      </div>
      <CarDetailBlock
        image={"/info_icon.png"}
        details={{
          License_Plate: carDetails?.licensePlate,
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
          Powered_Wheels: carDetails?.powerWheels,
          Drivetrain: carDetails?.drivetrain,
        }}
      />
    </Container>
  );
}
