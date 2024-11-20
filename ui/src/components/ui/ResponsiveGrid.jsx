export default function ResponsiveGrid({ children }) {
  return (
    <div className="w-full flex justify-evenly items-center">
      <div className="w-full grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}
