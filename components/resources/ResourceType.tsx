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
      className="card bg-base-200 border border-neutral col-span-12 md:col-span-6 lg:col-span-4 px-8 py-2 relative select-none cursor-pointer"
    >
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
