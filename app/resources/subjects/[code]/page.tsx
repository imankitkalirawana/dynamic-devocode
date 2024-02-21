import ResourceType from "@/components/resources/ResourceType";
import resourceTypes from "@/utils/resourceTypes";
import Breadcrumbs from "@/components/common/Breadcrumbs";

interface Props {
  params: {
    code: string;
  };
}

export default async function Page({ params }: Props) {
  const breadcrumbItems = [
    { labels: ["Home"], link: "/" },
    { labels: ["Resources"], link: "/resources" },
    { labels: ["Subjects"], link: "/resources/subjects" },
    { labels: [params.code] },
  ];
  return (
    <div className="mt-24 max-w-7xl m-auto p-8">
      <Breadcrumbs breadcrumbItems={breadcrumbItems} />
      <div className="grid grid-cols-12 gap-4 gap-y-6 mt-8">
        {resourceTypes.map((resourceType: string, index: any) => (
          <ResourceType
            ResourceType={resourceType}
            key={index}
            code={params.code}
          />
        ))}
      </div>
    </div>
  );
}
