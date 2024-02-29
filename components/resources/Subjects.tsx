"use client";
import Trash from "@/assets/Trash";
import Link from "next/link";
import axios from "axios";
import { isLoggedIn } from "@/utils/auth";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

type SubjectProps = {
  subjectData: {
    _id: string;
    title: string;
    code: string;
    description: string;
    addedDate: string;
  };
};

const Subjects: React.FC<SubjectProps> = ({ subjectData }) => {
  const router = useRouter();
  const { code, title, description, addedDate } = subjectData;
  const { loggedIn } = isLoggedIn();

  const humanReadableDate = new Date(addedDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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
      <div
        className="card bg-base-200 border border-neutral col-span-12 md:col-span-6 lg:col-span-4 relative select-none cursor-pointer"
        title={title}
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
                  <Link href={`/resources/subjects/update/${code}`}>Edit</Link>
                </li>
                <li>
                  <a>Archive</a>
                </li>
                <li>
                  <label
                    htmlFor={`delete_modal_${code}`}
                    className="text-error"
                  >
                    Delete
                  </label>
                </li>
              </ul>
            </div>
          </div>
        )}
        <Link href={`/resources/subjects/${code}/all`} className="px-8 py-4 ">
          <h2 className="text-xl font-bold" tabIndex={0} role="link">
            {code}
          </h2>
          <p className="mt-2 max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </p>
          <div className="flex justify-end items-center mt-2">
            <span className="text-xs">{humanReadableDate}</span>
          </div>
        </Link>
      </div>
      <input
        type="checkbox"
        id={`delete_modal_${code}`}
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
              onClick={(e) => handleDelete(e, code)}
            >
              Delete
            </button>
            <label className="btn flex-1" htmlFor={`delete_modal_${code}`}>
              Cancel
            </label>
          </div>
        </div>

        <label className="modal-backdrop" htmlFor={`delete_modal_$_{code}`}>
          Close
        </label>
      </div>
    </>
  );
};

// export default Subjects;
export default dynamic(() => Promise.resolve(Subjects), { ssr: false });
