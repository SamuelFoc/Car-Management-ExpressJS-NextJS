import Block from "@/components/layout/block/Block";
import ResponsiveGrid from "@/components/ui/ResponsiveGrid";
import ServiceCard from "./ServiceCard";
import { useEffect, useState } from "react";
import { apiFetch } from "@/utils/apiFetch";
import AddService from "./AddService";

export default function Services({ carId }) {
  const [serviceHistory, setServiceHistory] = useState();

  useEffect(() => {
    const fetchServiceHistory = async () => {
      try {
        const res = await apiFetch(`/service/${carId}`);
        setServiceHistory(res?.services);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
        setServiceHistory([]);
      }
    };

    fetchServiceHistory();
  }, []);

  return (
    <Block>
      <AddService carId={carId} />
      <ResponsiveGrid>
        {serviceHistory?.map((service) => {
          return <ServiceCard key={service?.id} data={service} carId={carId} />;
        })}
      </ResponsiveGrid>
      {serviceHistory?.length === 0 && (
        <div className="w-full flex justify-center items-center">
          <p className="w-full text-center">
            This car has no service history yet!
          </p>
        </div>
      )}
    </Block>
  );
}
