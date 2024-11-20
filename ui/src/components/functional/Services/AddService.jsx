"use client";
import { useState } from "react";
import { apiFetch } from "@/utils/apiFetch";
import NestedBlock from "@/components/ui/NestedBlock";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";

export default function AddService({ carId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    type: "",
    mileage: "",
    date: new Date("eu-DE"),
    changed: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const response = await apiFetch(`/service/${carId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      if (response?.service?.id) {
        alert("Car added successfully!");
        setFormData({
          type: "",
          mileage: 0,
          date: new Date(),
          changed: "",
        });
        window.location.reload();
      } else {
        alert(`Failed to add car!`);
      }
    } catch (err) {
      alert(`An error occurred: ${err.message}`);
    }
  };

  return (
    <NestedBlock>
      <div className="w-full flex items-center justify-between">
        <h1 className="text-xl font-bold">Add Service</h1>
        <Button onClick={() => setIsOpen(!isOpen)} width={"w-20"}>
          {isOpen ? "X" : "+"}
        </Button>
      </div>
      {isOpen && (
        <div className="w-full">
          <div className="w-full flex flex-col sm:flex-row items-center justify-evenly">
            <div className="w-full flex flex-col sm:flex-row items-center justify-evenly">
              <div>
                <FormSelect
                  id="type"
                  value={formData?.type}
                  onChange={handleChange}
                  options={[
                    { value: "Regular Service", label: "Regular Service" },
                    { value: "Oil Change", label: "Oil Change" },
                    { value: "Air Filter", label: "Air Filter" },
                    { value: "Cabine Filter", label: "Cabine Filter" },
                    { value: "Fuel Filter", label: "Fuel Filter" },
                    { value: "Timing Belt", label: "Timing Belt" },
                    { value: "Tires", label: "Tires" },
                    { value: "Brakes", label: "Brakes" },
                    { value: "Engine Parts", label: "Engine Parts" },
                    { value: "Electrical Wiring", label: "Electrical Wiring" },
                    { value: "Chassis Parts", label: "Chassis Parts" },
                    {
                      value: "Exhaust System Parts",
                      label: "Exhaust System Parts",
                    },
                  ]}
                  req={true}
                >
                  Service Type
                </FormSelect>
                <FormInput
                  id="mileage"
                  type="number"
                  value={formData?.mileage}
                  onChange={handleChange}
                  placeholder="--- ---"
                  req={true}
                >
                  Mileage
                </FormInput>
              </div>
              <div>
                <FormInput
                  id="date"
                  type="date"
                  value={formData?.date}
                  onChange={handleChange}
                  req={true}
                >
                  Date
                </FormInput>
                <FormInput
                  id="changed"
                  type="text"
                  value={formData?.changed}
                  onChange={handleChange}
                  req={false}
                >
                  Changed Parts
                </FormInput>
              </div>
            </div>
          </div>
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      )}
    </NestedBlock>
  );
}
