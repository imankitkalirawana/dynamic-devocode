import API_BASE_URL from "@/utils/config";
import Homepage from "@/components/resources/Homepage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resources",
  description: "Find resources for LPU exams and more",
};

async function getSubjects() {
  const res = await fetch(`${API_BASE_URL}/resources/subjects`, {
    cache: "no-cache",
    method: "GET",
  });
  return res.json();
}

export default async function Page() {
  const subjects = await getSubjects();

  return (
    <>
      <Homepage subjects={subjects} />
    </>
  );
}
