"use client";
import NestedBlock from "@/components/ui/NestedBlock";
import Button from "@/components/ui/Button";
import { useState } from "react";
import ServiceForm from "./ServiceForm";
import { apiFetch } from "@/utils/apiFetch";

export default function AddService({ carId, highestMileage }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleServiceSubmit = async (formData, resetForm) => {
    try {
      const response = await apiFetch(`/service/${carId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response?.service?.id) {
        alert("Service added successfully!");
        resetForm();
        window.location.reload();
      } else {
        alert("Failed to add service!");
      }
    } catch (err) {
      alert(`An error occurred: ${err.message}`);
    }
  };

  return (
    <NestedBlock>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Add Service</h1>
        <Button onClick={() => setIsOpen(!isOpen)} width="w-20">
          {isOpen ? "X" : "+"}
        </Button>
      </div>
      {isOpen && (
        <ServiceForm
          onSubmit={handleServiceSubmit}
          highestMileage={highestMileage}
        />
      )}
    </NestedBlock>
  );
}
