import API_BASE_URL from "@/utils/config";
import Resources from "@/components/resources/Resources";
import axios from "axios";

interface Props {
  params: {
    code: string;
    type: string;
  };
}

async function getResources(code: string, type: string) {
  //   const res = await fetch(
  //     `${API_BASE_URL}/resources/resources/?subjectCode=${code}&type=${type}`
  //   );
  const res = await axios.get(
    `${API_BASE_URL}/resources/resources/?subjectCode=${code}&type=${type}`
  );

  return res.data;
}

export default async function Page({ params }: Props) {
  const resources = await getResources(params.code, params.type);
  return (
    <div className="mt-24 max-w-7xl m-auto grid grid-cols-12 gap-4 gap-y-8 p-8">
      {resources.map((resource: any, index: any) => (
        <Resources resourceData={resource} key={index} />
      ))}
    </div>
  );
}
