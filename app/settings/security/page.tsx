import Security from "@/components/settings/Security";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description: "Change Password for Devocode By Divinely Developer",
};

const Page = () => {
  return (
    <>
      <Security />
    </>
  );
};

export default Page;
