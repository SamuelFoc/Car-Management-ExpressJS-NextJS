import MyCars from "@/components/functional/Cars/MyCars";
import UserDetails from "@/components/functional/User/UserDetails";
import SecureContainer from "@/components/layout/container/SecureContainer";
import Footer from "@/components/layout/footer/Footer";
import NavBar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <SecureContainer>
      <NavBar href={"/home"} />
      <UserDetails />
      <MyCars />
      <Footer />
    </SecureContainer>
  );
}
