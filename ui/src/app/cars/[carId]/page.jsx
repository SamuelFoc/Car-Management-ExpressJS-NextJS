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
        details={{
          License_Plate: carDetails?.licensePlate,
          VIN: carDetails?.vin,
          Mileage: carDetails?.mileage + " km",
        }}
      />
      <CarDetailBlock
        image={"/engine-icon.png"}
        details={{
          Engine: carDetails?.engine,
          Engine_Power: carDetails?.enginePower + " HP",
        }}
      />
      <CarDetailBlock
        image={"/wheel-icon.png"}
        details={{
          Powered_Wheels: carDetails?.powerWheels,
          Drivetrain: carDetails?.drivetrain,
        }}
      />
      <br />
      <Title>Service History</Title>
      <Services carId={carId} />
      <Footer />
    </SecureContainer>
  );
}
