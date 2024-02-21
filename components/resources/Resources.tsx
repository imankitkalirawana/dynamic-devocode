"use client";
type ResourceProps = {
  resourceData: {
    _id: string;
    title: string;
    description: string;
    link: string;
    file: string;
    addedDate: string;
  };
};

const Resources: React.FC<ResourceProps> = ({ resourceData }) => {
  const { title, description, addedDate, file, link } = resourceData;
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
  return (
    <div
      //   onClick={(e) => handleCardClick(e, code)}
      className="card bg-base-200 border border-neutral col-span-12 md:col-span-6 lg:col-span-4 px-8 py-4 relative select-none cursor-pointer"
      title={`Title: ${title}\nDescription: ${description}`}
    >
      <div className="mt-2">
        <h2 className="text-xl font-bold" tabIndex={0} role="link">
          {title}
        </h2>
        <p className="mt-2 max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap">
          {description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xs">{humanReadableDate}</span>
          <span className="text-xs">{getFileExtension(file)}</span>
        </div>
      </div>
    </div>
  );
};

export default Resources;
