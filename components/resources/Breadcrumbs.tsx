"use client";
import { isLoggedIn } from "@/utils/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Subject from "./add/Subject";
import Resource from "./add/Resource";
import dynamic from "next/dynamic";

const Breadcrumbs = () => {
  const { loggedIn } = isLoggedIn();
  const location = usePathname();
  const pathSegments = location?.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = pathSegments?.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return { label: segment, link: path };
  });

  // check if breadcrumbitem contains "update"
  const update = breadcrumbItems?.find((item) => item.label === "update");

  // get the last item in the array
  let lastItem = breadcrumbItems?.slice(-1)[0];
  // if there are 2 items after subjects then get the last second item
  if (lastItem?.label != "subjects") {
    lastItem = breadcrumbItems?.slice(-2)[0];
  }

  // exclue "all" from resourceType

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
        {loggedIn &&
          (lastItem?.label != "resources" && !update ? (
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
          ) : null)}
      </div>
      {loggedIn && (
        <>
          <input type="checkbox" id="add_subject" className="modal-toggle" />
          <div className="modal" role="dialog">
            {lastItem?.label === "subjects" ? (
              <Subject lastItem={lastItem} />
            ) : (
              <Resource lastItem={lastItem} />
            )}
            <label className="modal-backdrop" htmlFor="add_subject">
              Close
            </label>
          </div>
        </>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Breadcrumbs), { ssr: false });
