"use client";
import { useRouter } from "next/navigation";

const ResourceType = ({
  ResourceType,
  code,
}: {
  ResourceType: string;
  code: string;
}) => {
  const router = useRouter();
  const handleCardClick = (e: React.MouseEvent, code: string, type: string) => {
    const dropdown = e.currentTarget.querySelector(".dropdown");
    if (e.target === dropdown || dropdown?.contains(e.target as Node)) {
      e.preventDefault();
      return;
    }
    router.push(`/resources/subjects/${code}/${type}`);
  };
  return (
    <div
      onClick={(e) => handleCardClick(e, code, ResourceType)}
      className="card bg-base-200 border border-neutral col-span-12 md:col-span-6 lg:col-span-4 px-8 py-4 relative select-none cursor-pointer"
    >
      <div className="flex items-center justify-between">
        {/* <span className="text-sm">{subject.addedDate}</span> */}
        <div className="dropdown dropdown-end absolute right-3 top-3">
          <div tabIndex={0} role="button" className="btn btn-sm btn-ghost m-1">
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
          {/* capitalize resourceType */}
          {ResourceType.charAt(0).toUpperCase() + ResourceType.slice(1)}
        </h2>
        <p className="mt-2 max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
          {/* {title} */}
        </p>
      </div>
    </div>
  );
};

export default ResourceType;
