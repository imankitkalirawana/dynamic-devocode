import ResourceId from "@/components/resources/ResourceId";
import API_BASE_URL from "@/utils/config";
import React from "react";

interface Props {
  params: {
    code: string;
    type: string;
    resourceId: string;
  };
}

async function getResource(id: string) {
  const res = await fetch(
    `${API_BASE_URL}/resources/resources/?resourceId=${id}`,
    {
      cache: "no-cache",
      method: "GET",
    }
  );
  return res.json();
}

export default async function Page({ params }: Props) {
  const resource = await getResource(params.resourceId);
  return (
    <>
      <ResourceId code={params.code} resource={resource} />
    </>
  );
}
