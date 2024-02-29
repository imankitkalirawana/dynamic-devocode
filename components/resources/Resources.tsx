"use client";
import Trash from "@/assets/Trash";
import S3 from "aws-sdk/clients/s3";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLoggedIn } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";

const s3 = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
});

type ResourceProps = {
  resourceData: {
    _id: string;
    title: string;
    description: string;
    link: string;
    file: string;
    addedDate: string;
    resourceType: string;
  };
};

const Resources: React.FC<ResourceProps> = ({ resourceData }) => {
  const router = useRouter();
  const { loggedIn } = isLoggedIn();
  const handleDownload = async (filename: string) => {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: filename,
    };

    try {
      const url = await s3.getSignedUrlPromise("getObject", params);
      window.open(url, "_blank");
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardClick = (e: any, file: string, link: string) => {
    e.preventDefault();
    if (file) {
      handleDownload(file);
    } else if (link) {
      window.open(link, "_blank");
    }
  };
  const { _id, title, description, addedDate, file, link, resourceType } =
    resourceData;
  // function to convert date to human readable format
  const date = new Date(addedDate);
  const humanReadableDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // function to get file extension
  const getFileExtension = (file: string) => {
    if (!file) return;
    return file.split(".").pop();
  };

  const path = usePathname();
  const code = path?.split("/")[3];

  const handleDelete = async (e: any, resourceId: string) => {
    try {
      await toast
        .promise(
          axios.delete(`/api/resources/resources/?resourceId=${resourceId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          {
            loading: "Deleting...",
            success: "Deleted",
            error: "Error",
          }
        )
        .then(() => {
          router.refresh();
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        className="card bg-base-200 border border-neutral col-span-12 md:col-span-6 lg:col-span-4 relative select-none cursor-pointer"
        title={`Title: ${title}\nDescription: ${description}`}
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
                  <Link href={`/resources/subjects/update/${code}/${_id}`}>
                    Edit
                  </Link>
                </li>
                <li>
                  <a>Archive</a>
                </li>
                <li>
                  <label htmlFor={`delete_modal_${_id}`} className="text-error">
                    Delete
                  </label>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div
          className="px-8 py-4"
          onClick={(e) => handleCardClick(e, file, link)}
        >
          <div className="flex items-center">
            <h2 className="text-xl font-bold" tabIndex={0} role="link">
              {title}
            </h2>
            {file ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            )}
          </div>
          <p className="mt-2 max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
            {description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs">{humanReadableDate}</span>
            <span className="text-xs">{getFileExtension(file)}</span>
          </div>
        </div>
      </div>
      <input
        type="checkbox"
        id={`delete_modal_${_id}`}
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
              onClick={(e) => handleDelete(e, _id)}
            >
              Delete
            </button>
            <label className="btn flex-1" htmlFor={`delete_modal_${_id}`}>
              Cancel
            </label>
          </div>
        </div>

        <label className="modal-backdrop" htmlFor={`delete_modal_${_id}`}>
          Close
        </label>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Resources), { ssr: false });
