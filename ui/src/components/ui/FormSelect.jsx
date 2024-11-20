export default function FormSelect({
  children,
  id,
  value,
  options,
  onChange,
  req,
}) {
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-600 text-sm mb-2">{children}</label>
      {req && <span className="absolute -top-2 -left-2 text-red-600">*</span>}
      <select
        id={id || ""}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary text-primary"
        required={req}
      >
        <option value="" disabled>
          -- Select an option --
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
