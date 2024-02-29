import API_BASE_URL from "@/utils/config";
import Homepage from "@/components/resources/Homepage";
import axios from "axios";

async function getSubjects() {
  const res = await axios.get(`${API_BASE_URL}/resources/subjects`);
  return res.data;
}

export default async function Page() {
  const subjects = await getSubjects();

  return (
    <>
      <Homepage subjects={subjects} />
    </>
  );
}
