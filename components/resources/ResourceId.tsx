"use client";
import React, { useEffect, useState } from "react";
import API_BASE_URL from "@/utils/config";
import toast from "react-hot-toast";
import S3 from "aws-sdk/clients/s3";

import {
  DownloadIcon,
  ZipIcon,
  PdfIcon,
  PPTIcon,
  ClipboardIcon,
  ClipboardCheckIcon,
  DocsIcon,
  PngIcon,
  FileIcon,
  RedirectIcon,
} from "@/icons/Icons";

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
  resource: Resource;
  code: string;
};

const ResourceId: React.FC<ResourcesProps> = ({ code, resource }) => {
  const [isCopied, setisCopied] = useState(false);
  const [isDesktop, setisDesktop] = useState(false);
  let base_url = API_BASE_URL?.split("api")[0];
  const humanReadableDate = (addedDate: string) => {
    return new Date(addedDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

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
          success: "Downloading...",
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

  // handle copy link
  const handleCopyLink = () => {
    const url = `${base_url}resources/subjects/${code}/${resource.type}/${resource._id}`;

    setisCopied(true);
    setTimeout(() => {
      setisCopied(false);
    }, 3000);
    navigator.clipboard.writeText(url);
  };
  // get file extension
  const fileExtension = resource.file && resource.file.split(".").pop();

  useEffect(() => {
    if (window.innerWidth > 768) {
      setisDesktop(true);
    }
  }, []);

  const handleCardClick = (e: any, file: string, link: string) => {
    e.preventDefault();
    if (file) {
      handleDownload(file);
    } else if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <>
      <div className="flex justify-center mt-12">
        <div className="group min-w-80 before:transition-all before:duration-500 before:content-[''] before:w-[100%] before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-primary to-secondary/20 before:absolute before:top-0 h-72 relative bg-base-content flex flex-col items-center justify-center gap-2 text-center rounded-2xl overflow-hidden">
          <div className="w-28 h-28 bg-primary mt-8 rounded-full border-4 border-base-content z-10 transition-all duration-500 flex items-center justify-center font-bold text-xl">
            {code}
          </div>
          <div className="z-10 transition-all duration-500 text-base-100 mx-8">
            <span className="text-2xl font-semibold max-w-36 text-ellipsis whitespace-nowrap overflow-hidden">
              {resource.title}
            </span>
            <p>{resource.description}</p>
          </div>
          <div className="flex justify-center mt-4 gap-4">
            <div
              className={`button hover:bg-primary btn btn-primary btn-sm z-10 ${
                resource.file && "tooltip tooltip-primary"
              }`}
              data-tip={`Size: ${resource.filesize}Mb`}
              onClick={(e) => handleCardClick(e, resource.file, resource.link)}
            >
              <div className="button-wrapper">
                <div className="text">
                  {resource.file ? (
                    fileExtension === "zip" ? (
                      <ZipIcon className="h-5 w-5" />
                    ) : fileExtension === "pdf" ? (
                      <PdfIcon className="w-5 h-5" />
                    ) : fileExtension?.includes("ppt") ? (
                      <PPTIcon className="w-5 h-5" />
                    ) : fileExtension?.includes("doc") ? (
                      <DocsIcon className="w-5 h-5" />
                    ) : fileExtension == "png" || fileExtension == "jpg" ? (
                      <PngIcon className="w-5 h-5" />
                    ) : (
                      <FileIcon className="w-5 h-5" />
                    )
                  ) : (
                    <RedirectIcon className="w-5 h-5" />
                  )}
                  {resource.file ? "Download" : "Open"}
                </div>
                <span className="icon">
                  {resource.file ? (
                    <DownloadIcon className="w-5 h-5" />
                  ) : (
                    <RedirectIcon className="w-5 h-5" />
                  )}
                </span>
              </div>
            </div>
            <div
              className={`button hover:bg-primary btn btn-primary btn-sm z-10 ${
                isCopied && "tooltip tooltip-open"
              }`}
              data-tip="Copied to clipboard"
              onClick={handleCopyLink}
            >
              <div className="button-wrapper">
                <div className="text">{isCopied ? "Copied" : "Copy Link"}</div>
                <span className="icon">
                  {isCopied ? (
                    <ClipboardCheckIcon className="w-5 h-5" />
                  ) : (
                    <ClipboardIcon className="w-5 h-5" />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isDesktop &&
        fileExtension &&
        parseInt(resource.filesize) < 4 &&
        (fileExtension === "png" ||
          fileExtension == "pdf" ||
          fileExtension == "jpg") && (
          <iframe
            src={`${API_BASE_URL}/file/${resource.file}`}
            className="h-screen w-full card mt-24 object-cover"
          ></iframe>
        )}
    </>
  );
};

export default ResourceId;
