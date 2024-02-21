import API_BASE_URL from "@/utils/config";
import Resources from "@/components/resources/Resources";
import axios from "axios";
import Breadcrumbs from "@/components/common/Breadcrumbs";

interface Props {
  params: {
    code: string;
    type: string;
  };
}

async function getResources(code: string, type: string) {
  const res = await axios.get(
    `${API_BASE_URL}/resources/resources/?subjectCode=${code}&type=${type}`
  );
  return res.data;
}

export default async function Page({ params }: Props) {
  const breadcrumbItems = [
    { labels: ["Home"], link: "/" },
    { labels: ["Resources"], link: "/resources" },
    { labels: ["Subjects"], link: "/resources/subjects" },
    { labels: [params.code], link: `/resources/subjects/${params.code}` },
    { labels: [params.type] },
  ];
  const resources = await getResources(params.code, params.type);
  return (
    <div className="mt-24 max-w-7xl m-auto p-8">
      <Breadcrumbs breadcrumbItems={breadcrumbItems} />
      <div className="grid grid-cols-12 gap-4 gap-y-8 mt-8">
        {resources.map((resource: any, index: any) => (
          <Resources resourceData={resource} key={index} />
        ))}
      </div>
    </div>
  );
}
