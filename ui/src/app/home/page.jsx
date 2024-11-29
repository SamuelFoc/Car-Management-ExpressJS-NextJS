import MyCars from "@/components/functional/Cars/MyCars";
import UserDetails from "@/components/functional/User/UserDetails";
import SecureContainer from "@/components/layout/container/SecureContainer";

export default function Home() {
  return (
    <SecureContainer>
      <UserDetails />
      <MyCars />
    </SecureContainer>
  );
}
