export default function Title({ children, subtitle }) {
  return (
    <div className="w-full flex items-center justify-start">
      <h1 className="text-secondary text-2xl font-bold">{children}</h1>
      <h3 className="ms-2 text-gray-500 opacity-50 text-2xl">{subtitle}</h3>
    </div>
  );
}
