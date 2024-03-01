"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ResourceType = ({
  ResourceType,
  code,
}: {
  ResourceType: string;
  code: string;
}) => {
  const location = usePathname();

  return (
    <>
      <Link
        href={`/resources/subjects/${code}/${ResourceType}`}
        className={`btn btn-sm ${
          location?.includes(ResourceType)
            ? "btn-primary"
            : "" ||
              (location === `/resources/subjects/${code}` &&
                ResourceType === "all")
            ? "btn-primary"
            : ""
        }`}
      >
        {ResourceType.charAt(0).toUpperCase() + ResourceType.slice(1)}
      </Link>
    </>
  );
};

export default ResourceType;
