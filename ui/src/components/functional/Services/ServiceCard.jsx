"use client";
import { apiFetch } from "@/utils/apiFetch";
import dateFormater from "@/utils/dateFormatter";
import numberFormatter from "@/utils/numberFormatter";

export default function ServiceCard({ data, carId }) {
  const handleDelete = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!userConfirmed) return; // Exit if the user cancels

    try {
      const res = await apiFetch(`/service/${carId}/${data?.id}`, {
        method: "DELETE",
      });

      if (res.message) {
        alert("Item successfully deleted."); // Notify the user of successful deletion
        window.location.reload();
      } else {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Failed to delete the item.");
      }
    } catch (err) {
      alert(`Error: ${err.message}`); // Show error message
    }
  };

  return (
    <div className="w-full max-w-56 h-56 bg-gray-100 bg-opacity-5 rounded-xl flex flex-col relative">
      <span
        className="absolute top-2 right-2 hover:cursor-pointer"
        onClick={handleDelete}
      >
        🗑️
      </span>
      <div className="flex-1 w-full flex items-center justify-center">
        <h1 className="text-secondary font-bold text-xl">{data?.type}</h1>
      </div>
      <div className="flex-1 flex-col w-full p-4 flex items-start justify-center text-gray-400">
        <div className="w-full">
          <strong>Date:&emsp;</strong>
          <span>{dateFormater(data?.date)}</span>
        </div>
        <div className="w-full">
          <strong>Mileage:&emsp;</strong>
          <span>{numberFormatter(data?.mileage)} km</span>
        </div>
        <div className="w-full">
          <strong>Parts:&emsp;</strong>
          <span>{data?.changed || "-"}</span>
        </div>
      </div>
    </div>
  );
}
