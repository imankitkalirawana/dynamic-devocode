import API_BASE_URL from "@/utils/config";
import Resources from "@/components/resources/Resources";
import axios from "axios";
import NotFound from "@/components/assets/NotFound";

interface Props {
  params: {
    code: string;
    type: string;
  };
}

async function getResources(code: string, type: string) {
  if (type === "all") {
    const res = await axios.get(
      `${API_BASE_URL}/resources/resources/?subjectCode=${code}`
    );
    return res.data;
  }
  const res = await axios.get(
    `${API_BASE_URL}/resources/resources/?subjectCode=${code}&type=${type}`
  );
  return res.data;
}

export default async function Page({ params }: Props) {
  const resources = await getResources(params.code, params.type);
  return (
    <>
      <div className="grid grid-cols-12 gap-4 gap-y-8 mt-8">
        {resources.length > 0 ? (
          resources.map((resource: any, index: any) => (
            <Resources resourceData={resource} key={index} />
          ))
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}
