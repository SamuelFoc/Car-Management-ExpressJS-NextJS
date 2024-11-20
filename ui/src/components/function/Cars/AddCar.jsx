"use client";
import { useEffect, useState } from "react";
import Block from "@/components/layout/block/Block";
import { apiFetch } from "@/utils/apiFetch";

export default function AddCar() {
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
      console.log(response);
      if (response.ok) {
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
      } else {
        const error = await response.json();
        alert(`Failed to add car: ${error.message}`);
      }
    } catch (err) {
      alert(`An error occurred: ${err.message}`);
    }
  };

  useEffect(() => {
    console.log("Reload");
  }, []);

  const requiredFields = ["make", "model", "year", "vin", "mileage"];

  return (
    <Block>
      <h1 className="text-2xl font-bold mb-4">Add Car</h1>
      <form
        onSubmit={handleSubmit}
        className="text-black grid grid-cols-1 gap-6 p-6"
      >
        {[
          { id: "make", label: "Make", placeholder: "Ford" },
          { id: "model", label: "Model", placeholder: "Mustang" },
          { id: "year", label: "Year", placeholder: "2022", type: "number" },
          { id: "vin", label: "VIN", placeholder: "1HGCM82633A123456" },
          {
            id: "licensePlate",
            label: "License Plate",
            placeholder: "ABC-1234",
          },
          { id: "engine", label: "Engine", placeholder: "1.6 TDCi" },
          {
            id: "enginePower",
            label: "Engine Power (HP)",
            placeholder: "150",
            type: "number",
          },
          { id: "mileage", label: "Mileage", placeholder: "0", type: "number" },
        ].map(({ id, label, placeholder, type = "text" }) => (
          <div key={id} className="flex flex-col">
            <label htmlFor={id} className="text-gray-500 font-medium">
              {label}
              {requiredFields.includes(id) && (
                <span className="text-red-500">*</span>
              )}
            </label>
            <input
              id={id}
              type={type}
              value={formData[id]}
              onChange={handleChange}
              placeholder={placeholder}
              className="text-black mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
              required={requiredFields.includes(id)}
            />
          </div>
        ))}

        <div className="flex flex-col">
          <label htmlFor="drivetrain" className="text-gray-700 font-medium">
            Drivetrain
          </label>
          <select
            id="drivetrain"
            value={formData.drivetrain}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="4WD">4WD</option>
            <option value="2WD">2WD</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="powerWheels" className="text-gray-700 font-medium">
            Power Wheels
          </label>
          <select
            id="powerWheels"
            value={formData.powerWheels}
            onChange={handleChange}
            className="mt-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="Front">Front</option>
            <option value="Rear">Rear</option>
            <option value="All">All</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Car
        </button>
      </form>
    </Block>
  );
}
