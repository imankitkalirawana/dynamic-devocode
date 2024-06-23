"use client";
import { Chip } from "@nextui-org/react";
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
      <Chip
        as={Link}
        color={location?.includes(ResourceType) ? "primary" : "default"}
        href={`/resources/subjects/${code}/${ResourceType}`}
        // className={`btn btn-sm ${
        //   location?.includes(ResourceType)
        //     ? "btn-primary"
        //     : "" ||
        //       (location === `/resources/subjects/${code}` &&
        //         ResourceType === "all")
        //     ? "btn-primary"
        //     : ""
        // }`}
      >
        {ResourceType.charAt(0).toUpperCase() + ResourceType.slice(1)}
      </Chip>
    </>
  );
};

export default ResourceType;
