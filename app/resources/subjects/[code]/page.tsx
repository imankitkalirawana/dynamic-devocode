import ResourceType from "@/components/resources/ResourceType";
import resourceTypes from "@/utils/resourceTypes";

interface Props {
  params: {
    code: string;
  };
}

export default async function Page({ params }: Props) {
  return (
    <>
      <div className="mt-24 max-w-7xl m-auto grid grid-cols-12 gap-4 gap-y-8 p-8">
        {resourceTypes.map((resourceType: string, index: any) => (
          <ResourceType
            ResourceType={resourceType}
            key={index}
            code={params.code}
          />
        ))}
      </div>
    </>
  );
}
