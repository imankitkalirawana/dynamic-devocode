import ResourceType from "@/components/resources/ResourceType";
import resourceTypes from "@/utils/resourceTypes";

interface Props {
  params: {
    code: string;
  };
}

export default function Layout({
  children,
  params,
}: {
  readonly children: React.ReactNode;
  params: Props["params"];
}) {
  return (
    <>
      <div className="flex gap-4 p-2 mt-4 overflow-x-scroll">
        {resourceTypes.map((resourceType: string, index: any) => (
          <ResourceType
            ResourceType={resourceType}
            key={index}
            code={params.code}
          />
        ))}
      </div>
      {children}
    </>
  );
}
