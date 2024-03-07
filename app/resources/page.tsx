"use client";
import API_BASE_URL from "@/utils/config";
import Homepage from "@/components/resources/Homepage";
import axios from "axios";
import { useEffect, useState } from "react";

// async function getSubjects() {
//   const res = await axios.get(`${API_BASE_URL}/resources/subjects`);
//   return res.data;
// }

export default function Page() {
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

  return (
    <>
      <Homepage subjects={subjects} />
    </>
  );
}
