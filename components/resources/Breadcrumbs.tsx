"use client";
import resourceTypes from "@/utils/resourceTypes";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Breadcrumbs = () => {
  const location = usePathname();
  const pathSegments = location?.split("/").filter((segment) => segment !== "");
  const [selectedType, setSelectedType] = useState("others");

  const handleTypeChange = (e: any) => {
    setSelectedType(e.target.value);
  };

  const breadcrumbItems = pathSegments?.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return { label: segment, link: path };
  });

  // get the last item in the array
  let lastItem = breadcrumbItems?.slice(-1)[0];
  // if there are 2 items after subjects then get the last second item
  if (lastItem?.label != "subjects") {
    lastItem = breadcrumbItems?.slice(-2)[0];
  }

  // exclue "all" from resourceType
  const resourceType = resourceTypes.filter((type) => type != "all");

  return (
    <>
      <div className="text-sm breadcrumbs select-none cursor-default flex">
        <ul>
          {breadcrumbItems?.map((item, index) => (
            <li key={index}>
              {index !== breadcrumbItems.length - 1 ? (
                <Link href={item.link}>
                  {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                </Link>
              ) : (
                <span>
                  {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                </span>
              )}
            </li>
          ))}
        </ul>
        {lastItem?.label != "resources" ? (
          <label
            htmlFor="add_subject"
            className="btn btn-sm btn-circle ml-4 active:ring-4 focus:ring-4 ring-primary/50 hover:btn-primary"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </label>
        ) : null}
      </div>
      <input type="checkbox" id="add_subject" className="modal-toggle" />
      <div className="modal" role="dialog">
        <form className="modal-box max-w-96">
          <h2 className="text-lg text-center font-semibold">
            Add to {lastItem?.label}
          </h2>
          {lastItem?.label === "subjects" ? (
            <div className="mx-auto flex flex-col mb-8 overflow-y-scroll px-4 py-2 gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="code" className="label">
                  <span className="label-text">Code</span>
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="title" className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="description" className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
            </div>
          ) : (
            <div className="mx-auto flex flex-col mb-8 overflow-y-scroll px-4 py-2 gap-2">
              <div className="flex flex-col w-full">
                <label htmlFor="title" className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="description" className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="resource_type" className="label">
                  <span className="label-text">Resource Type</span>
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={handleTypeChange}
                >
                  {resourceType.map((type, index) =>
                    type == "others" ? (
                      <option key={index} selected value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ) : (
                      <option key={index} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    )
                  )}
                </select>
              </div>
              {/* elements added based on user selection */}
              {selectedType === "link" || selectedType === "moocs" ? (
                <div className="flex flex-col w-full">
                  <label htmlFor="url" className="label">
                    <span className="label-text">URL</span>
                  </label>
                  <input
                    type="text"
                    id="url"
                    name="url"
                    className="input input-bordered w-full"
                  />
                </div>
              ) : (
                <div className="flex flex-col w-full">
                  <label htmlFor="file" className="label">
                    <span className="label-text">File</span>
                  </label>
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="file-input file-input-bordered w-full"
                  />
                </div>
              )}
            </div>
          )}
          <div className="flex modal-action">
            <button className="btn btn-primary flex-1" type="submit">
              Add
            </button>
            <label className="btn flex-1" htmlFor="add_subject">
              Cancel
            </label>
          </div>
        </form>

        <label className="modal-backdrop" htmlFor="add_subject">
          Close
        </label>
      </div>
    </>
  );
};

export default Breadcrumbs;
