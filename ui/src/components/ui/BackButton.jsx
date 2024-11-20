import { useRouter } from "next/navigation";

export default function BackButton({ children }) {
  const router = useRouter();

  return (
    <div className="w-fit flex justify-center p-4">
      <button
        onClick={() => router.back()}
        className="w-12 text-center bg-secondary text-primary font-black py-2 rounded hover:bg-primary-dark"
      >
        {children}
      </button>
    </div>
  );
}
