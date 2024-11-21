import { useState } from "react";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";

export default function ServiceForm({ onSubmit, highestMileage }) {
  const [formData, setFormData] = useState({
    type: "",
    mileage: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
    changed: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "mileage" && value) {
      const mileageValue = parseInt(value, 10);
      if (mileageValue <= highestMileage) {
        setError(`Mileage must be higher than ${highestMileage} km.`);
      } else {
        setError("");
      }
    }

    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormReset = () => {
    setFormData({
      type: "",
      mileage: "",
      date: new Date().toISOString().split("T")[0],
      changed: "",
    });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error) {
      alert("Please resolve the error before submitting.");
      return;
    }
    onSubmit(formData, handleFormReset);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="w-full flex flex-col sm:flex-row items-center justify-evenly">
        <FormSection>
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
              { value: "Exhaust System Parts", label: "Exhaust System Parts" },
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
            placeholder="Enter Mileage"
            req={true}
          >
            Mileage
          </FormInput>
          {error && <p className="text-red-500">{error}</p>}
        </FormSection>
        <FormSection>
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
            placeholder="Changed Parts (optional)"
            req={false}
          >
            Changed Parts
          </FormInput>
        </FormSection>
      </div>
      <div className="w-full flex justify-center mt-4">
        <Button width="w-20" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
}

function FormSection({ children }) {
  return <div className="flex flex-col space-y-4">{children}</div>;
}
