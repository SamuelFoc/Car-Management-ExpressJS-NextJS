import AuthProvider from "@/components/auth/AuthProvider";

export default function SecureContainer({ children }) {
  return (
    <div className="w-full max-w-3xl flex flex-col gap-5">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
