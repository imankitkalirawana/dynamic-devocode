import Logs from "@/components/logs/Logs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Logs",
  description: "Logs for Divinely Developer",
};

export default function Page() {
  return (
    <>
      <div className="col-span-full lg:col-span-9">
        <Logs />
      </div>
    </>
  );
}
