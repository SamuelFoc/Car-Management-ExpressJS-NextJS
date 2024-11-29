export default function ResponsiveGrid({ children, wider }) {
  const smCols = wider ? "sm:grid-cols-1" : "sm:grid-cols-2";
  const mdCols = wider ? "md:grid-cols-2" : "md:grid-cols-3";
  const lgCols = wider ? "lg:grid-cols-2" : "lg:grid-cols-3";

  return (
    <div className="w-full flex justify-evenly items-center">
      <div
        className={`w-full grid justify-items-center grid-cols-1 ${smCols} ${mdCols} ${lgCols} gap-4`}
      >
        {children}
      </div>
    </div>
  );
}
