import Sidebar from "@/components/settings/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings - Devocode By Divinely Developer",
};

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="mt-24 max-w-7xl m-auto p-8 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
      <Sidebar />
      {children}
    </div>
  );
}
