export default function FormInput({
  children,
  type,
  value,
  placeholder,
  onChange,
  req,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-600 text-sm mb-2">{children}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder={placeholder}
        required={req}
      />
    </div>
  );
}
