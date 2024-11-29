import dateFormater from "@/utils/dateFormatter";

export default function DocumentCard({ data, carData }) {
  // Define the type-to-color mapping
  const colorMap = {
    ek: "green",
    tk: "red",
    default: "gray", // Default color if type is not "ek" or "tk"
  };

  // Get the color for the given type or use default
  const color = colorMap[data?.type] || colorMap.default;

  // Define the title based on the type
  const title =
    data?.type === "ek"
      ? "Emission Inspection Certificate"
      : data?.type === "tk"
      ? "Technical Inspection Certificate"
      : "Insurance Card";
  return (
    <div
      className={`w-80 h-48 shadow-xl rounded-md bg-${color}-200 bg-center bg-cover py-2 px-1`}
      style={{ backgroundImage: "url('/card-texture.png')" }}
    >
      {/* Use Tailwind explicitly for all possible classes */}
      <div
        className={`w-full h-full flex flex-col text-black ${
          data?.type === "ek"
            ? "bg-green-200"
            : data?.type === "tk"
            ? "bg-red-200"
            : "bg-gray-200"
        }`}
      >
        <div
          className={`flex-1 flex font-bold ${
            data?.type === "ek"
              ? "bg-green-400"
              : data?.type === "tk"
              ? "bg-red-400"
              : "bg-gray-400"
          }`}
        >
          <div
            className={`w-16 h-full p-1 ${
              data?.type === "ek"
                ? "bg-green-500"
                : data?.type === "tk"
                ? "bg-red-500"
                : "bg-gray-500"
            }`}
          >
            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-sm rounded-full">
              STK
            </div>
          </div>
          <div className="h-full w-full flex flex-col items-center justify-center">
            {title}
            <span className="text-xs font-thin">
              Country Technical Inspection
            </span>
          </div>
        </div>
        <div className="px-2 py-2 flex-[3] border-t-2 text-sm border-black">
          <div>
            <strong>Manufacturer:&ensp;</strong>
            <span>{carData?.make}</span>
          </div>
          <div>
            <strong>Model:&ensp;</strong>
            <span>{carData?.model}</span>
          </div>
          <div>
            <strong>VIN:&ensp;</strong>
            <span>{carData?.vin}</span>
          </div>
          <div>
            <strong>SPZ:&ensp;</strong>
            <span>{carData?.licensePlate}</span>
          </div>
          <div>
            <strong>Validity:&ensp;</strong>
            <span>
              from {dateFormater(data?.valid_from)} to{" "}
              {dateFormater(data?.valid_to)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
