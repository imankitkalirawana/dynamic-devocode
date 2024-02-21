import Breadcrumbs from "@/components/resources/Breadcrumbs";

export default function Layout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <div className="mt-24 max-w-7xl m-auto p-8">
      <Breadcrumbs />
      <div className="grid grid-cols-12 gap-4 gap-y-8 mt-8">{children}</div>
    </div>
  );
}
