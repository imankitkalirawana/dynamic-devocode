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
  return (
    <>
      {subjects.length > 0 ? (
        subjects.map((subject: any, index: any) => (
          <Subjects key={index} subjectData={subject} />
        ))
      ) : (
        <NotFound />
      )}
    </>
  );
}
