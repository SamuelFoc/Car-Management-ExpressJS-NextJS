import Cars from "@/components/function/Cars/Cars";
import UserDetails from "@/components/function/User/UserDetails";
import SecureContainer from "@/components/layout/container/SecureContainer";
import Heading from "@/components/layout/heading/Heading";

export default function Home() {
  return (
    <SecureContainer>
      <Heading />
      <UserDetails />
      <Cars></Cars>
    </SecureContainer>
  );
}
