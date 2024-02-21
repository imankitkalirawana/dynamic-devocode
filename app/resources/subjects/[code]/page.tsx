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
      {resourceTypes.map((resourceType: string, index: any) => (
        <ResourceType
          ResourceType={resourceType}
          key={index}
          code={params.code}
        />
      ))}
    </>
  );
}
