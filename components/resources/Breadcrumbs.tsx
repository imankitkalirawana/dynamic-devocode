"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const location = usePathname();
  const pathSegments = location?.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = pathSegments?.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return { label: segment, link: path };
  });

  return (
    <div className="text-sm breadcrumbs select-none cursor-default">
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
    </div>
  );
};

export default Breadcrumbs;
