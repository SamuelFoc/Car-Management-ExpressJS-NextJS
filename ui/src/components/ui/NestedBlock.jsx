export default function NestedBlock({ children, title, gap }) {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center px-3 gap-${gap} py-4`}
    >
      {title && (
        <h1 className="w-full items-start text-secondary font-bold text-2xl">
          {title}
        </h1>
      )}
      {children}
    </div>
  );
}
