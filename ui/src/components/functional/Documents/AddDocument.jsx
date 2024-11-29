"use client";
import NestedBlock from "@/components/ui/NestedBlock";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { apiFetch } from "@/utils/apiFetch";
import DocumentForm from "./DocumentForm";

export default function AddDocument({ carId }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDocumentSubmit = async (formData, resetForm) => {
    try {
      const response = await apiFetch(`/documents/${carId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response?.service?.id) {
        alert("Document added successfully!");
        resetForm();
        window.location.reload();
      } else {
        alert("Failed to add document!");
      }
    } catch (err) {
      alert(`An error occurred: ${err.message}`);
    }
  };

  return (
    <NestedBlock>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Add Document</h1>
        <Button onClick={() => setIsOpen(!isOpen)} width="w-20">
          {isOpen ? "X" : "+"}
        </Button>
      </div>
      {isOpen && <DocumentForm onSubmit={handleDocumentSubmit} />}
    </NestedBlock>
  );
}
