import API_BASE_URL from "@/utils/config";
import Homepage from "@/components/resources/Homepage";

async function getSubjects() {
  // const res = await axios.get(`${API_BASE_URL}/resources/subjects`);
  const res = await fetch(`${API_BASE_URL}/resources/subjects`, {
    cache: "no-cache",
  });
  return await res.json();
}

export default async function Page() {
  const subjects = await getSubjects();

  return (
    <>
      <Homepage subjects={subjects} />
    </>
  );
}
