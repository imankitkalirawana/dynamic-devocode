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
import React, { useEffect, useState } from "react";

const s3 = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
});

type Resource = {
  _id: string;
  title: string;
  description: string;
  link: string;
  file: string;
  addedDate: string;
  type: string;
  filesize: string;
};

type ResourcesProps = {
  resources: Resource[];
  type: string;
};

const Resources: React.FC<ResourcesProps> = ({ resources, type }) => {
  const router = useRouter();
  const { loggedIn } = isLoggedIn();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");

  useEffect(() => {
    const savedFilterCriteria = localStorage.getItem("resourceFilterCriteria");
    if (savedFilterCriteria) {
      setFilterCriteria(savedFilterCriteria);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resourceFilterCriteria", filterCriteria);
  }, [filterCriteria]);

  const handleDownload = async (filename: string) => {
    const params = {
      Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
      Key: filename,
    };

    try {
      const url = await toast.promise(
        s3.getSignedUrlPromise("getObject", params),
        {
          loading: "Loading...",
          success: "Download Started",
          error: "Error Downloading File",
        },
        {
          id: "download",
          duration: 5000,
        }
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error(err);
    }
  };

  const openFile = (file: string) => {
    const extension = file.split(".").pop();
    if (
      extension === "pdf" ||
      extension === "png" ||
      extension === "jpg" ||
      extension === "jpeg"
    ) {
      window.open(`/api/file/${file}`, "_blank");
    } else {
      toast.promise(
        handleDownload(file),
        {
          loading: "Loading...",
          success: "Cannot open file! Downloading...",
          error: "Error Downloading File",
        },
        {
          id: "download",
        }
      );
      // handleDownload(file);
    }
  };

  const handleCardClick = (
    e: any,
    file: string,
    link: string,
    filesize: string
  ) => {
    e.preventDefault();
    if (file && parseInt(filesize) < 4) {
      openFile(file);
    } else if (file && parseInt(filesize) > 4) {
      handleDownload(file);
    } else if (link) {
      window.open(link, "_blank");
    }
  };

  const humanReadableDate = (addedDate: string) => {
    return new Date(addedDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // function to get file extension
  const getFileExtension = (file: string) => {
    if (!file) return;
    return file.split(".").pop();
  };

  const path = usePathname();
  const code = path?.split("/")[3];

  const handleDelete = async (e: any, resourceId: string) => {
    try {
      await axios
        .delete(`/api/resources/resources/?resourceId=${resourceId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          const modal = document.getElementById(`delete_modal_${resourceId}`);
          modal?.click();
          toast.success("Resource deleted");
          router.refresh();
        });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  const filterResources = () => {
    switch (filterCriteria) {
      case "ascending":
        return resources.sort((a: any, b: any) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
      case "descending":
        return resources.sort((a: any, b: any) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA > titleB) {
            return -1;
          }
          if (titleA < titleB) {
            return 1;
          }
          return 0;
        });
      case "newest":
        return resources.sort((a: any, b: any) => {
          const dateA = new Date(a.addedDate);
          const dateB = new Date(b.addedDate);
          return dateB.getTime() - dateA.getTime();
        });
      case "oldest":
        return resources.sort((a: any, b: any) => {
          const dateA = new Date(a.addedDate);
          const dateB = new Date(b.addedDate);
          return dateA.getTime() - dateB.getTime();
        });
      case "type":
        return resources.sort((a: any, b: any) => {
          const typeA = a.type.toLowerCase();
          const typeB = b.type.toLowerCase();

          if (typeA < typeB) {
            return -1;
          }
          if (typeA > typeB) {
            return 1;
          }
          return 0;
        });
      default:
        return resources;
    }
  };

  const filteredResources = filterResources();

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
            placeholder={`Search ${
              type == "all" ? "anything" : type
            } in ${code}`}
            className="input input-bordered w-full sm:w-72 pl-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100/20 backdrop-blur-lg rounded-box w-52"
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
            <li onClick={() => setFilterCriteria("type")}>
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
                    d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
                By Type
              </a>
            </li>
          </ul>
        </div>
      </div>
      {filteredResources
        .filter((resource) => {
          if (searchQuery === "") {
            return resource;
          } else if (
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (resource.description &&
              resource.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            resource.type.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return resource;
          }
        })
        .map((resource) => (
          <div
            className="card bg-base-200 border border-neutral col-span-12 md:col-span-6 lg:col-span-4 relative select-none cursor-pointer"
            title={`Title: ${resource.title}\nDescription: ${resource.description}`}
          >
            {path?.includes("all") && (
              // <span className="indicator-item badge badge-primary -top-2 -right-4 absolute">
              //   {resource.type}
              // </span>
              <span className="indicator-item absolute -top-2 -right-4 inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/70 backdrop-blur-lg">
                {resource.type}
              </span>
            )}

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
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100/30 backdrop-blur-lg rounded-box w-52"
                >
                  <li onClick={() => openFile(resource.file)}>
                    <a>Open file</a>
                  </li>
                  <li onClick={() => handleDownload(resource.file)}>
                    <a>Download</a>
                  </li>
                  {loggedIn && (
                    <>
                      <li>
                        <Link
                          href={`/resources/subjects/update/${code}/${resource._id}`}
                        >
                          Edit
                        </Link>
                      </li>

                      <li>
                        <a>Archive</a>
                      </li>
                      <li>
                        <label
                          htmlFor={`delete_modal_${resource._id}`}
                          className="text-error"
                        >
                          Delete
                        </label>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div
              className="px-8 py-4"
              onClick={(e) =>
                handleCardClick(
                  e,
                  resource.file,
                  resource.link,
                  resource.filesize
                )
              }
            >
              <div className="flex items-center">
                <h2
                  className="text-lg font-bold max-w-[80%] overflow-hidden text-ellipsis whitespace-nowrap"
                  tabIndex={0}
                  role="link"
                >
                  {resource.title}
                </h2>
                {resource.file ? (
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
                {resource.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs">
                  {humanReadableDate(resource.addedDate)}
                </span>
                <span className="text-xs"></span>
                {resource.file && (
                  <span className="text-xs">
                    {parseInt(resource.filesize)}mb (
                    {getFileExtension(resource.file)})
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      {resources.map((resource) => (
        <React.Fragment key={resource._id}>
          <input
            type="checkbox"
            id={`delete_modal_${resource._id}`}
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
                  onClick={(e) => handleDelete(e, resource._id)}
                >
                  Delete
                </button>
                <label
                  className="btn flex-1"
                  htmlFor={`delete_modal_${resource._id}`}
                >
                  Cancel
                </label>
              </div>
            </div>
            <label
              className="modal-backdrop"
              htmlFor={`delete_modal_${resource._id}`}
            >
              Close
            </label>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

export default dynamic(() => Promise.resolve(Resources), { ssr: false });
