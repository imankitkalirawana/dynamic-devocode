import API_BASE_URL from "@/utils/config";
import Subjects from "@/components/resources/Subjects";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import axios from "axios";

async function getSubjects() {
  const res = await axios.get(`${API_BASE_URL}/resources/subjects`);
  return res.data;
}

export default async function Page() {
  const breadcrumbItems = [
    { labels: ["Home"], link: "/" },
    { labels: ["Resources"], link: "/resources" },
    { labels: ["Subjects"] },
  ];
  const subjects = await getSubjects();
  return (
    <div className="mt-24 max-w-7xl m-auto p-8">
      {/* <Breadcrumbs /> */}
      <Breadcrumbs breadcrumbItems={breadcrumbItems} />
      <div className="grid grid-cols-12 gap-4 gap-y-8 mt-8">
        {subjects.map((subject: any, index: any) => (
          <Subjects key={index} subjectData={subject} />
        ))}
      </div>
    </div>
  );
}
