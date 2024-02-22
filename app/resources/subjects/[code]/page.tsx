import React from "react";
import Resources from "@/components/resources/Resources";
import API_BASE_URL from "@/utils/config";
import axios from "axios";

interface Resource {
  _id: string;
  title: string;
  description: string;
  link: string;
  file: string;
  addedDate: string;
}

interface Props {
  params: {
    code: string;
  };
}

async function getResources(code: string): Promise<Resource[]> {
  const res = await axios.get(
    `${API_BASE_URL}/resources/resources/?subjectCode=${code}`
  );
  return res.data;
}

export default async function Page({ params }: Props) {
  const resources = await getResources(params.code);
  return (
    <>
      <div className="grid grid-cols-12 gap-4 gap-y-8 mt-8">
        {resources.map((resource: Resource, index: number) => (
          <Resources resourceData={resource} key={index} />
        ))}
      </div>
    </>
  );
}
