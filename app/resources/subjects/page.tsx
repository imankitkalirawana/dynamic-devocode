"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Subject = {
  _id: string;
  title: string;
  code: string;
  description: string;
  addedDate: string;
};

const Page = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent, code: string) => {
    const dropdown = e.currentTarget.querySelector(".dropdown");
    if (e.target === dropdown || dropdown?.contains(e.target as Node)) {
      e.preventDefault();
      return;
    }
    router.push(`/resources/subjects/${code}`);
  };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("/api/resources/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubjects();
  }, []);
  return (
    <div className="mt-24 max-w-7xl m-auto grid grid-cols-12 gap-4 gap-y-8 p-8">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-4 card px-8 py-4"
            >
              <div className="flex justify-between items-center">
                <div className="skeleton w-[50%] h-6"></div>
                <div className="skeleton btn btn-circle pointer-events-none btn-ghost btn-sm"></div>
              </div>
              <div className="skeleton h-4 w-full"></div>
              {/* <div className="skeleton h-4 w-28 self-end"></div> */}
            </div>
          ))
        : subjects.map((subject, index) => (
            <div
              key={index}
              onClick={(e) => handleCardClick(e, subject.code)}
              // href={`/resources/subjects/${subject.id}`}
              className="card bg-base-200 border border-neutral col-span-12 md:col-span-6 lg:col-span-4 px-8 py-4 relative select-none cursor-pointer"
              title={subject.title}
            >
              <div className="flex items-center justify-between">
                {/* <span className="text-sm">{subject.addedDate}</span> */}
                <div className="dropdown dropdown-end absolute right-3 top-3">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-sm btn-ghost m-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                      />
                    </svg>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>Edit</a>
                    </li>
                    <li>
                      <a>Archive</a>
                    </li>
                    <li>
                      <a className="text-error">Delete</a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-2">
                <h2 className="text-xl font-bold" tabIndex={0} role="link">
                  {subject.code}
                </h2>
                <p className="mt-2 max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                  {subject.title}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Page;
