import AddCar from "@/components/function/Cars/addCar";
import Cars from "@/components/function/Cars/Cars";
import UserDetails from "@/components/function/User/UserDetails";
import SecureContainer from "@/components/layout/container/SecureContainer";
import Footer from "@/components/layout/footer/Footer";
import Heading from "@/components/layout/heading/Heading";

export default function Home() {
  return (
    <SecureContainer>
      <Heading href={"/home"} />
      <UserDetails />
      <AddCar />
      <Cars />
      <Footer />
    </SecureContainer>
  );
}
