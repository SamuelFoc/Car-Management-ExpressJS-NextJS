export default function FormInput({
  children,
  id,
  type,
  value,
  placeholder,
  onChange,
  req,
}) {
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-600 text-sm mb-2">{children}</label>
      {req && <span className="absolute -top-0 -left-2 text-red-600">*</span>}
      <input
        id={id || ""}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary text-primary"
        placeholder={placeholder}
        required={req}
      />
    </div>
  );
}
