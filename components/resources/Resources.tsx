"use client";
import S3 from "aws-sdk/clients/s3";

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
  };
};

const Resources: React.FC<ResourceProps> = ({ resourceData }) => {
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

  const handleClick = async (filename: string, link: string) => {
    if (link) {
      window.open(link, "_blank");
    } else {
      handleDownload(filename);
    }
  };

  const { title, description, addedDate, file, link } = resourceData;
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
      onClick={() => handleClick(file, link)}
      className="card bg-base-200 border border-neutral col-span-12 md:col-span-6 lg:col-span-4 px-4 py-4 relative select-none cursor-pointer flex-row items-start"
      title={`Title: ${title}\nDescription: ${description}`}
    >
      <div className="absolute right-6 top-6">
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
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
      </div>
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
