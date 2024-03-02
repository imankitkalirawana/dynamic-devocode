import Breadcrumbs from "@/components/resources/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subjects - Devocode By Divinely Developer",
};
export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="mt-24 max-w-7xl m-auto p-8">
      <Breadcrumbs />

      {children}
    </div>
  );
}
