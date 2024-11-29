import AuthProvider from "@/components/auth/AuthProvider";
import Footer from "../footer/Footer";
import NavBar from "@/components/ui/Navbar";

export default function SecureContainer({ children }) {
  return (
    <div className="w-full max-w-3xl flex flex-col gap-5">
      <AuthProvider>
        <NavBar href={"/home"} />
        {children}
        <Footer />
      </AuthProvider>
    </div>
  );
}
