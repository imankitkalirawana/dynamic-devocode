"use client";
import Trash from "@/assets/Trash";
import Link from "next/link";
import axios from "axios";
import { isLoggedIn } from "@/utils/auth";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";

type Subject = {
  _id: string;
  title: string;
  code: string;
  description: string;
  addedDate: string;
};

type SubjectsProps = {
  subjects: Subject[];
};

const Subjects: React.FC<SubjectsProps> = ({ subjects }) => {
  const router = useRouter();
  const { loggedIn } = isLoggedIn();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");

  useEffect(() => {
    const savedFilterCriteria = localStorage.getItem("subjectFilterCriteria");
    if (savedFilterCriteria) {
      setFilterCriteria(savedFilterCriteria);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("subjectFilterCriteria", filterCriteria);
  }, [filterCriteria]);

  const humanReadableDate = (addedDate: string) => {
    return new Date(addedDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    code: string
  ) => {
    e.preventDefault();
    try {
      const modal = document.getElementById(`delete_modal_${code}`);
      await toast.promise(
        axios.delete(`/api/resources/subjects/${code}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          loading: "Deleting...",
          success: "Deleted",
          error: "Error",
        }
      );
      modal?.click();
      router.refresh();
      // window.location.reload();
      // close the modal
    } catch (error) {
      console.error(error);
    }
  };

  const filterSubjects = () => {
    switch (filterCriteria) {
      case "ascending":
        return subjects.sort((a, b) => {
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
      case "descending":
        return subjects.sort((a, b) => {
          const codeA = a.code.toLowerCase();
          const codeB = b.code.toLowerCase();
          if (codeA > codeB) {
            return -1;
          }
          if (codeA < codeB) {
            return 1;
          }
          return 0;
        });
      case "newest":
        return subjects.sort((a, b) => {
          const dateA = new Date(a.addedDate);
          const dateB = new Date(b.addedDate);
          return dateB.getTime() - dateA.getTime();
        });
      case "oldest":
        return subjects.sort((a, b) => {
          const dateA = new Date(a.addedDate);
          const dateB = new Date(b.addedDate);
          return dateA.getTime() - dateB.getTime();
        });
      default:
        return subjects;
    }
  };

  const filteredSubjects = filterSubjects();

  return (
    <>
      <div className="col-span-12 flex items-center gap-4">
        <div className="col-span-12 relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 absolute left-0 top-[50%] translate-y-[-50%] ml-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by code or title..."
            className="input input-bordered w-full sm:w-fit pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        {/* filter button */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle m-1 tooltip flex justify-center items-center"
            data-tip="Filter Subjects"
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
                d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li onClick={() => setFilterCriteria("ascending")}>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25"
                  />
                </svg>
                Ascending
              </a>
            </li>
            <li onClick={() => setFilterCriteria("descending")}>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
                  />
                </svg>
                Descending
              </a>
            </li>
            <li onClick={() => setFilterCriteria("newest")}>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Newest First
              </a>
            </li>
            <li onClick={() => setFilterCriteria("oldest")}>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                Oldest First
              </a>
            </li>
          </ul>
        </div>
      </div>
      {filteredSubjects
        .filter(
          (subject) =>
            subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subject.code.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((subject) => (
          <div
            key={subject._id}
            className="card bg-base-200 border border-neutral col-span-12 md:col-span-6 lg:col-span-4 relative select-none cursor-pointer"
            title={subject.title}
          >
            {loggedIn && (
              <div className="flex items-center justify-between">
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
                    className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
                  >
                    <li>
                      <Link href={`/resources/subjects/update/${subject.code}`}>
                        Edit
                      </Link>
                    </li>
                    <li>
                      <a>Archive</a>
                    </li>
                    <li>
                      <label
                        htmlFor={`delete_modal_${subject.code}`}
                        className="text-error"
                      >
                        Delete
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <Link
              href={`/resources/subjects/${subject.code}/all`}
              className="px-8 py-4 "
            >
              <h2 className="text-xl font-bold" tabIndex={0} role="link">
                {subject.code}
              </h2>
              <p className="mt-2 max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
                {subject.title}
              </p>
              <div className="flex justify-end items-center mt-2">
                <span className="text-xs">
                  {humanReadableDate(subject.addedDate)}
                </span>
              </div>
            </Link>
          </div>
        ))}
      {subjects.map((subject) => (
        <React.Fragment key={subject._id}>
          <input
            type="checkbox"
            id={`delete_modal_${subject.code}`}
            className="modal-toggle"
          />
          <div className="modal" role="dialog">
            <div className="modal-box max-w-96">
              <div className="max-w-40 mx-auto flex mb-8">
                <Trash />
              </div>
              <div className="flex modal-action">
                <button
                  className="btn btn-primary flex-1"
                  onClick={(e) => handleDelete(e, subject.code)}
                >
                  Delete
                </button>
                <label
                  className="btn flex-1"
                  htmlFor={`delete_modal_${subject.code}`}
                >
                  Cancel
                </label>
              </div>
            </div>
            <label
              className="modal-backdrop"
              htmlFor={`delete_modal_${subject.code}`}
            >
              Close
            </label>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

// export default Subjects;
export default dynamic(() => Promise.resolve(Subjects), { ssr: false });
