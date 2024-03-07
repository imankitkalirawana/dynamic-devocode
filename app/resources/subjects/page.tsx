import API_BASE_URL from "@/utils/config";
import Subjects from "@/components/resources/Subjects";
import NotFound from "@/components/assets/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subjects",
  description: "Find subjects based on your course for LPU exams and more",
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

  // filter subjects with isArchived = false
  const filteredSubjects = subjects?.filter(
    (subject: any) => subject.isArchived === false
  );

  // sort with code
  filteredSubjects?.sort((a: any, b: any) => {
    const codeA = a.code.toLowerCase();
    const codeB = b.code.toLowerCase();

    if (codeA < codeB) {
      return -1;
    }
    if (codeA > codeB) {
      return 1;
    }
    return 0;
  });

  return (
    <>
      <div className="grid grid-cols-12 gap-4 gap-y-8 mt-8">
        {filteredSubjects?.length > 0 ? (
          <Subjects subjects={filteredSubjects} />
        ) : (
          <NotFound message="Nothing uploaded there! Maybe you can try later." />
        )}
      </div>
    </>
  );
}
