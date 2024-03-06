import API_BASE_URL from "@/utils/config";
import Subjects from "@/components/resources/Subjects";
import NotFound from "@/components/assets/NotFound";

async function getSubjects() {
  // const res = await fetch(`${API_BASE_URL}/resources/subjects`, {
  //   cache: "no-cache",
  //   method: "GET",
  // });
  // return res.json();
  return [
    {
      _id: "1",
      code: "CS 101",
      title: "Introduction to Computer Science",
      description: "This is the description of CS 101",
      isArchived: false,
    },
    {
      _id: "2",
      code: "CS 102",
      title: "Data Structures and Algorithms",
      description: "This is the description of CS 102",
      isArchived: false,
    },
    {
      _id: "3",
      code: "CS 103",
      title: "Operating Systems",
      description: "This is the description of CS 103",
      isArchived: true,
    },
    {
      _id: "4",
      code: "CS 104",
      title: "Database Management Systems",
      description: "This is the description of CS 104",
      isArchived: false,
    },
  ];
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
