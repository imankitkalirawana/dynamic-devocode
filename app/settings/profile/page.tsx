import Profile from "@/components/settings/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Manage your account profile of Devocode By Divinely Developer",
};

const Page = () => {
  return (
    <>
      <Profile />
    </>
  );
};

export default Page;
