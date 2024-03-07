import Preference from "@/components/settings/Preferences";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Change Preferences, appearance and more settings for Devocode By Divinely Developer",
};

const Page = () => {
  return (
    <>
      <Preference />
    </>
  );
};

export default Page;
