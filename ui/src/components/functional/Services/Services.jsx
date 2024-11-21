import Block from "@/components/layout/block/Block";
import ResponsiveGrid from "@/components/ui/ResponsiveGrid";
import ServiceCard from "./ServiceCard";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/apiFetch";
import AddService from "./AddService";

export default function Services({ carId }) {
  const [serviceHistory, setServiceHistory] = useState([]);

  useEffect(() => {
    const fetchServiceHistory = async () => {
      try {
        const res = await apiFetch(`/service/${carId}`);
        setServiceHistory(res?.services || []);
      } catch (error) {
        console.error("Error fetching service history:", error.message);
        setServiceHistory([]);
      }
    };

    fetchServiceHistory();
  }, [carId]);

  // Calculate the highest mileage
  const highestMileage = serviceHistory.reduce(
    (max, service) => Math.max(max, service?.mileage || 0),
    0
  );

  // Sort services by mileage in descending order
  const sortedServices = [...serviceHistory].sort(
    (a, b) => (b.mileage || 0) - (a.mileage || 0)
  );

  return (
    <Block>
      <AddService carId={carId} highestMileage={highestMileage} />
      <ResponsiveGrid>
        {sortedServices.map((service) => (
          <ServiceCard key={service?.id} data={service} carId={carId} />
        ))}
      </ResponsiveGrid>
      {serviceHistory.length === 0 && (
        <div className="w-full flex justify-center items-center">
          <p className="w-full text-center">
            This car has no service history yet!
          </p>
        </div>
      )}
    </Block>
  );
}
