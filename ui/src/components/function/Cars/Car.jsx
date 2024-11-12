import Image from "next/image";
import Link from "next/link";

export default function Car({ car }) {
  return (
    <Link
      href={`/cars/${car?.id}`}
      className="bg-gray-100 bg-opacity-5 rounded-md w-64 p-4 flex flex-col items-center justify-center gap-1 hover:cursor-pointer relative"
    >
      <Image src={"/car_1.png"} width={150} height={150} alt="car" />
      <h1 className="text-gray-200">
        <strong>{car?.make}</strong>&ensp;
        <strong>{car?.model}</strong>
        &ensp;<span className="opacity-50">({car?.year})</span>
      </h1>
      <div className="text-gray-500 w-fit flex items-center justify-center px-3 py-1 rounded-sm font-black absolute top-0 left-0">
        {car?.licensePlate}
      </div>
    </Link>
  );
}
