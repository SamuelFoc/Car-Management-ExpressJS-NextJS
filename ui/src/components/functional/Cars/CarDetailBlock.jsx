"use client";
import Block from "@/components/layout/block/Block";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";
import { apiFetch } from "@/utils/apiFetch";
import { useEffect, useState } from "react";

export default function CarDetailBlock({ image, details, carId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Update formData when details prop changes
  useEffect(() => {
    if (details) {
      const updatedFormData = details.reduce(
        (acc, { key, data }) => ({ ...acc, [key]: data }),
        {}
      );
      setFormData(updatedFormData);
    }
  }, [details]);

  const toggleEditMode = () => setIsEditing((prev) => !prev);

  const handleChange = async (e) => {
    const { id, value } = e.target;

    // Optimistically update the formData state
    setFormData((prev) => ({ ...prev, [id]: value }));

    try {
      // Make the API call to update the car details
      await apiFetch(`/cars/${carId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [id]: value }), // Send the updated field
      });
    } catch (error) {
      console.error("Error updatings car details:", error);
    }
  };

  return (
    <Block gap={5}>
      <div className="w-full flex flex-col justify-center items-center sm:flex-row relative">
        <button
          type="button"
          className="absolute top-0 right-0 cursor-pointer"
          onClick={toggleEditMode}
          aria-label="Edit details"
        >
          ✏️
        </button>
        <div>
          <img className="w-40" src={image} alt="detail-icon" />
        </div>
        <div className="w-full flex flex-col items-center sm:items-start justify-evenly">
          {details?.map(({ key, label, selection }) => (
            <div
              key={key}
              className="w-full flex gap-2 justify-center sm:justify-start"
            >
              {isEditing ? (
                selection ? (
                  <FormSelect
                    id={key}
                    value={formData[key]}
                    onChange={handleChange}
                    options={selection}
                  >
                    {label}
                  </FormSelect>
                ) : (
                  <FormInput
                    id={key}
                    value={formData[key] || ""}
                    onChange={handleChange}
                  >
                    {label}
                  </FormInput>
                )
              ) : (
                <>
                  <strong>{label}:</strong>
                  <span className="text-gray-400 opacity-80">
                    {formData[key]}
                  </span>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
}
