"use client";
import { useParams } from "next/navigation";
import CarDetails from "@/components/functional/Cars/CarDetails";
import CarDocuments from "@/components/functional/Documents/CarDocuments";
import SecureContainer from "@/components/layout/container/SecureContainer";
import Services from "@/components/functional/Services/Services";

export default function CarDetail() {
  const { carId } = useParams();

  return (
    <SecureContainer>
      <CarDocuments carId={carId} />
      <CarDetails carId={carId} />
      <br />
      <Services carId={carId}>Service History</Services>
    </SecureContainer>
  );
}
