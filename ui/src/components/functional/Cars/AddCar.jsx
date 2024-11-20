"use client";
import { useEffect, useState } from "react";
import Block from "@/components/layout/block/Block";
import { apiFetch } from "@/utils/apiFetch";
import NestedBlock from "@/components/ui/NestedBlock";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";

export default function AddCar() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    vin: "",
    licensePlate: "",
    engine: "",
    enginePower: "",
    drivetrain: "2WD",
    powerWheels: "Front",
    mileage: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiFetch("/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response?.car?.id) {
        alert("Car added successfully!");
        setFormData({
          make: "",
          model: "",
          year: "",
          vin: "",
          licensePlate: "",
          engine: "",
          enginePower: "",
          drivetrain: "2WD",
          powerWheels: "Front",
          mileage: "",
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
        <h1 className="text-xl font-bold">Add Car</h1>
        <Button onClick={() => setIsOpen(!isOpen)} width={"w-20"}>
          {isOpen ? "X" : "+"}
        </Button>
      </div>
      {isOpen && (
        <div className="w-full">
          <div className="w-full flex flex-col sm:flex-row items-center justify-evenly">
            <div className="flex flex-col">
              <FormInput
                id="make"
                type="text"
                value={formData?.make}
                onChange={handleChange}
                placeholder="Ford"
                req={true}
              >
                Manufacturer
              </FormInput>
              <FormInput
                id="model"
                type="text"
                value={formData?.model}
                onChange={handleChange}
                placeholder="Focus MK2"
                req={true}
              >
                Model
              </FormInput>
              <FormInput
                id="year"
                type="text"
                value={formData?.year}
                onChange={handleChange}
                placeholder="2020"
                req={true}
              >
                Year
              </FormInput>
              <FormInput
                id="vin"
                type="text"
                value={formData?.vin}
                onChange={handleChange}
                placeholder="1HGCM82633A123456"
                req={false}
              >
                VIN
              </FormInput>
              <FormInput
                id="licensePlate"
                type="text"
                value={formData?.licensePlate}
                onChange={handleChange}
                placeholder="AA-111AB"
                req={false}
              >
                License Plate
              </FormInput>
            </div>
            <div className="flex flex-col">
              <FormInput
                id="mileage"
                type="number"
                min={0}
                value={formData?.mileage}
                onChange={handleChange}
                placeholder="120000"
                req={false}
              >
                Mileage
              </FormInput>
              <FormInput
                id="engine"
                type="text"
                value={formData?.engine}
                onChange={handleChange}
                placeholder="1.6 TDCi"
                req={false}
              >
                Engine
              </FormInput>
              <FormInput
                id="enginePower"
                type="text"
                value={formData?.enginePower}
                onChange={handleChange}
                placeholder="140HP"
                req={false}
              >
                Engine Power HP
              </FormInput>
              <FormSelect
                id="drivetrain"
                value={formData?.drivetrain}
                onChange={handleChange}
                options={[
                  { value: "2WD", label: "2WD" },
                  { value: "4WD", label: "4WD" },
                ]}
              >
                Drivetrain
              </FormSelect>
              <FormSelect
                id="powerWheels"
                value={formData?.powerWheels}
                onChange={handleChange}
                options={[
                  { value: "Front", label: "Front" },
                  { value: "Rear", label: "Rear" },
                  { value: "All", label: "All" },
                ]}
              >
                Drivetrain
              </FormSelect>
            </div>
          </div>
          <Button onClick={handleSubmit}>Add</Button>
        </div>
      )}
    </NestedBlock>
  );
}
