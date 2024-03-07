import Overview from "@/components/settings/Overview";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Overview",
  description: "Manage your account profile of Devocode By Divinely Developer",
};

export default async function Page() {
  return (
    <>
      <Overview />
    </>
  );
}
