import { useState } from "react";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import FormSelect from "@/components/ui/FormSelect";

export default function DocumentForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    valid_from: new Date().toISOString().split("T")[0],
    valid_to: new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormReset = () => {
    setFormData({
      type: "",
      name: "",
      valid_from: new Date().toISOString().split("T")[0],
      valid_to: new Date().toISOString().split("T")[0],
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
              { value: "ek", label: "Emission Inspection Certificate" },
              { value: "tk", label: "Technical Inspection Certificate" },
              { value: "ic", label: "Insurance Certificate" },
            ]}
            req={true}
          >
            Document Type
          </FormSelect>
          <FormInput
            id="valid_from"
            type="date"
            value={formData?.valid_from}
            onChange={handleChange}
            req={true}
          >
            Valid From
          </FormInput>
          {error && <p className="text-red-500">{error}</p>}
        </FormSection>
        <FormSection>
          <FormInput
            id="name"
            type="text"
            value={formData?.name}
            onChange={handleChange}
            placeholder="Enter Name"
            req={true}
          >
            Name
          </FormInput>

          <FormInput
            id="valid_to"
            type="date"
            value={formData?.valid_to}
            onChange={handleChange}
            req={true}
          >
            Valid To
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
