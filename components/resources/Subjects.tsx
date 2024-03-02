"use client";
import Trash from "@/assets/Trash";
import Link from "next/link";
import axios from "axios";
import { isLoggedIn } from "@/utils/auth";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React from "react";
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

  return (
    <>
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
      {subjects
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
