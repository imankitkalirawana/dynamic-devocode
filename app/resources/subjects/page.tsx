import API_BASE_URL from "@/utils/config";
import Subjects from "@/components/resources/Subjects";
import axios from "axios";
import NotFound from "@/components/assets/NotFound";

async function getSubjects() {
  const res = await axios.get(`${API_BASE_URL}/resources/subjects`);
  return res.data;
}

export default async function Page() {
  const subjects = await getSubjects();
  // filter subjects with isArchived = false
  const filteredSubjects = subjects.filter(
    (subject: any) => subject.isArchived === false
  );

  return (
    <>
      <div className="grid grid-cols-12 gap-4 gap-y-8 mt-8">
        {filteredSubjects.length > 0 ? (
          // filteredSubjects.map((subject: any, index: any) => (
          subjects.map((subject: any, index: any) => (
            <Subjects key={index} subjectData={subject} />
          ))
        ) : (
          <NotFound />
        )}
      </div>
    </>
  );
}
