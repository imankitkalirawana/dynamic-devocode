"use client";
import React, { useEffect, useState } from "react";
import API_BASE_URL from "@/utils/config";
import { toast } from "sonner";
import S3 from "aws-sdk/clients/s3";

import {
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
import { Button, Card, Chip } from "@nextui-org/react";
import Link from "next/link";
import { isLoggedIn } from "@/utils/auth";

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
  const { loggedIn } = isLoggedIn();
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
        }
      );
      const link = document.createElement("a");
      // @ts-ignore
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
    }, 10000);
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
      <div className="flex items-center justify-center p-4">
        <div className="flex h-full  w-full items-start justify-center overflow-scroll">
          <Card className="w-[400px]">
            <div className="p-3 z-10 w-full justify-center flex items-center shrink-0">
              <span className="text-default-foreground bg-default rounded-full h-20 w-20 translate-y-12 flex items-center justify-center">
                {code}
              </span>
              {loggedIn && (
                <Button
                  variant="flat"
                  radius="full"
                  size="sm"
                  as={Link}
                  href={`/resources/subjects/update/${code}/${resource._id}`}
                  className="absolute right-3 top-3 z-0"
                >
                  Edit
                </Button>
              )}
            </div>
            <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased">
              <div className="pb-4 pt-6">
                <p className="text-large font-medium">{resource.title}</p>
                <p className="max-w-[90%] text-small text-default-400">
                  @divinelydeveloper
                </p>
                <div className="flex gap-2 overflow-scroll pb-1 pt-2">
                  <Chip className="capitalize">{resource.type}</Chip>
                  {resource.file && (
                    <>
                      <Chip>{resource.filesize} MB</Chip>
                    </>
                  )}
                  <Chip className="capitalize">
                    {humanReadableDate(resource.addedDate)}
                  </Chip>
                </div>
                <p className="py-2 text-small text-foreground">
                  {resource.description}
                </p>
                <div className="hidden gap-2">
                  <p>
                    <span className="text-small font-medium text-default-500">
                      13
                    </span>
                    &nbsp;
                    <span className="text-small text-default-400">
                      Downloads
                    </span>
                  </p>
                  <p>
                    <span className="text-small font-medium text-default-500">
                      2500
                    </span>
                    &nbsp;
                    <span className="text-small text-default-400">Views</span>
                  </p>
                </div>
              </div>
              <div
                data-slot="base"
                className="flex flex-col sm:flex-row gap-2 justify-between w-full"
              >
                <Button
                  size="md"
                  variant="flat"
                  color="primary"
                  onClick={(e) =>
                    handleCardClick(e, resource.file, resource.link)
                  }
                  startContent={
                    resource.file ? (
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
                    )
                  }
                >
                  {resource.file ? "Download" : "Open"}
                </Button>
                <Button
                  size="md"
                  variant="flat"
                  onClick={handleCopyLink}
                  startContent={
                    isCopied ? (
                      <ClipboardCheckIcon className="w-5 h-5" />
                    ) : (
                      <ClipboardIcon className="w-5 h-5" />
                    )
                  }
                >
                  {isCopied ? "Copied" : "Copy Link"}
                </Button>
              </div>
            </div>
          </Card>
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
