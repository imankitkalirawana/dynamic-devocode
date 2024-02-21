"use client";
import Sad from "@/assets/Sad";
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
  const { code, title } = subjectData;

  const handleCardClick = (e: React.MouseEvent, code: string) => {
    const dropdown = e.currentTarget.querySelector(".dropdown");
    if (e.target === dropdown || dropdown?.contains(e.target as Node)) {
      e.preventDefault();
      return;
    }
    router.push(`/resources/subjects/${code}`);
  };

  return (
    <>
      <div
        onClick={(e) => handleCardClick(e, code)}
        className="card bg-base-200 border border-neutral col-span-12 md:col-span-6 lg:col-span-4 px-8 py-4 relative select-none cursor-pointer"
        title={title}
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
              className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
            >
              <li>
                <a>Edit</a>
              </li>
              <li>
                <a>Archive</a>
              </li>
              <li>
                <label htmlFor="delete_modal" className="text-error">
                  Delete
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-2">
          <h2 className="text-xl font-bold" tabIndex={0} role="link">
            {code}
          </h2>
          <p className="mt-2 max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
            {title}
          </p>
        </div>
      </div>
      <input type="checkbox" id="delete_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box max-w-96">
          <div className="max-w-40 mx-auto flex mb-8">
            <Sad />
          </div>
          <div className="flex modal-action">
            <button
              className="btn btn-primary flex-1"
              // onClick={handleLogout}
              // disabled={isloggingOut}
            >
              {/* {isloggingOut ? (
                <span className="loading loading-dots loading-sm"></span>
              ) : (
                "Logout"
              )} */}
              "Delete"
            </button>
            <label className="btn flex-1" htmlFor="delete_modal">
              Cancel
            </label>
          </div>
        </div>

        <label className="modal-backdrop" htmlFor="delete_modal">
          Close
        </label>
      </div>
    </>
  );
};

export default Subjects;
