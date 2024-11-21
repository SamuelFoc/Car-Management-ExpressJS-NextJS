"use client";
import CarDetailBlock from "@/components/functional/Cars/CarDetailBlock";
import Services from "@/components/functional/Services/Services";
import SecureContainer from "@/components/layout/container/SecureContainer";
import Footer from "@/components/layout/footer/Footer";
import BackButton from "@/components/ui/BackButton";
import NavBar from "@/components/ui/Navbar";
import Row from "@/components/ui/Row";
import Title from "@/components/ui/Title";
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
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    fetchCarDetails();
  }, []);

  return (
    <SecureContainer>
      <NavBar />
      <Row>
        <Title subtitle={carDetails?.year}>
          {carDetails?.make + " " + carDetails?.model}
        </Title>
        <BackButton>◀</BackButton>
      </Row>
      <CarDetailBlock
        image={"/info-icon.png"}
        carId={carId}
        details={[
          {
            label: "License Plate",
            key: "licensePlate",
            data: carDetails?.licensePlate,
          },
          {
            label: "VIN",
            key: "vin",
            data: carDetails?.vin,
          },
          {
            label: "Mileage",
            key: "mileage",
            data: carDetails?.mileage,
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
            data: carDetails?.engine,
          },
          {
            label: "Engine Power",
            key: "enginePower",
            data: carDetails?.enginePower + "HP",
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
            data: carDetails?.powerWheels,
            selection: [
              { value: "Front", label: "Front" },
              { value: "Rear", label: "Rear" },
              { value: "All", label: "All" },
            ],
          },
          {
            label: "Drivetrain",
            key: "drivetrain",
            data: carDetails?.drivetrain,
            selection: [
              { value: "4WD", label: "4WD" },
              { value: "2WD", label: "2WD" },
            ],
          },
        ]}
      />
      <br />
      <Title>Service History</Title>
      <Services carId={carId} />
      <Footer />
    </SecureContainer>
  );
}
