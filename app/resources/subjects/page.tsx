"use client";
import API_BASE_URL from "@/utils/config";
import Subjects from "@/components/resources/Subjects";
import NotFound from "@/components/assets/NotFound";
import axios from "axios";
import { useEffect, useState } from "react";

// async function getSubjects() {
//   const res = await fetch(`${API_BASE_URL}/resources/subjects`, {
//     cache: "no-cache",
//     method: "GET",
//   });
//   return res.json();
// }

export default function Page() {
  // const subjects = await getSubjects();
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/resources/subjects`);
        setSubjects(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubjects();
  }, []);

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
