import API_BASE_URL from "@/utils/config";
import Subjects from "@/components/resources/Subjects";
import axios from "axios";

async function getSubjects() {
  // const res = await fetch(`${API_BASE_URL}/resources/subjects`);
  const res = await axios.get(`/api/resources/subjects`);
  return res.data;
}

export default async function Page() {
  const subjects = await getSubjects();
  // dummy subjects
  // const subjects = [
  //   {
  //     id: "1",
  //     title: "Mathematics",
  //     code: "MTH101",
  //   },
  //   {
  //     id: "2",
  //     title: "Physics",
  //     code: "PHY101",
  //   },
  //   {
  //     id: "3",
  //     title: "Chemistry",
  //     code: "CHM101",
  //   },
  //   {
  //     id: "4",
  //     title: "Biology",
  //     code: "BIO101",
  //   },
  //   {
  //     id: "5",
  //     title: "Computer Science",
  //     code: "CSC101",
  //   },
  // ];
  return (
    <div className="mt-24 max-w-7xl m-auto grid grid-cols-12 gap-4 gap-y-8 p-8">
      {subjects.map((subject: any, index: any) => (
        <Subjects key={index} subjectData={subject} />
      ))}
    </div>
  );
}
