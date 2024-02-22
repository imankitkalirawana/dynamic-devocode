"use client";
import Link from "next/link";
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
    <>
      <Link
        href={`/resources/subjects/${code}/${ResourceType}`}
        className={`btn btn-sm`}
      >
        {ResourceType.charAt(0).toUpperCase() + ResourceType.slice(1)}
      </Link>
    </>
  );
};

export default ResourceType;
