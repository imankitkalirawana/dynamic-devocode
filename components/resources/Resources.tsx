"use client";
import S3 from "aws-sdk/clients/s3";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLoggedIn } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import DropdownDetailed from "../common/DropdownDetailed";
import {
  IconAdjustmentsHorizontal,
  IconCopy,
  IconDotsVertical,
  IconDownload,
  IconEdit,
  IconFile,
  IconFileIsr,
  IconLink,
  IconPencil,
  IconSearch,
  IconSortAscending,
  IconSortAscendingShapes,
  IconSortAscendingSmallBig,
  IconSortAZ,
  IconSortDescending,
  IconSortDescendingSmallBig,
  IconSortZA,
  IconTrash,
  IconZoomScan,
} from "@tabler/icons-react";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import API_BASE_URL from "@/utils/config";

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
  resources: Resource[];
  type: string;
};

const Resources: React.FC<ResourcesProps> = ({ resources, type }) => {
  const router = useRouter();
  const { loggedIn } = isLoggedIn();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const deleteModal = useDisclosure();
  const [clickedItem, setClickedItem] = useState<Resource | null>(null);

  useEffect(() => {
    if (!deleteModal.isOpen) {
      setClickedItem(null);
    }
  }, [deleteModal.isOpen]);

  useEffect(() => {
    const savedFilterCriteria = localStorage.getItem("resourceFilterCriteria");
    if (savedFilterCriteria) {
      setFilterCriteria(savedFilterCriteria);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resourceFilterCriteria", filterCriteria);
  }, [filterCriteria]);

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
          success: "Download Started",
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

  const openFile = (file: string) => {
    const extension = file.split(".").pop();
    if (
      extension === "pdf" ||
      extension === "png" ||
      extension === "jpg" ||
      extension === "jpeg"
    ) {
      window.open(`/api/file/${file}`, "_blank");
    } else {
      toast.promise(handleDownload(file), {
        loading: "Loading...",
        success: "Cannot open file! Downloading...",
        error: "Error Downloading File",
      });
    }
  };

  const humanReadableDate = (addedDate: string) => {
    return new Date(addedDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // function to get file extension
  const getFileExtension = (file: string) => {
    if (!file) return;
    return file.split(".").pop();
  };

  const path = usePathname();
  const code = path?.split("/")[3];

  const handleDelete = async (e: any, resourceId: any) => {
    try {
      await axios
        .delete(`/api/resources/resources/?resourceId=${resourceId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then(() => {
          // close the modal
          deleteModal.onOpenChange();
          // refresh the page
          router.refresh();
        });
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error(error);
    }
  };

  const filterResources = () => {
    switch (filterCriteria) {
      case "ascending":
        return resources.sort((a: any, b: any) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA < titleB) {
            return -1;
          }
          if (titleA > titleB) {
            return 1;
          }
          return 0;
        });
      case "descending":
        return resources.sort((a: any, b: any) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();

          if (titleA > titleB) {
            return -1;
          }
          if (titleA < titleB) {
            return 1;
          }
          return 0;
        });
      case "newest":
        return resources.sort((a: any, b: any) => {
          const dateA = new Date(a.addedDate);
          const dateB = new Date(b.addedDate);
          return dateB.getTime() - dateA.getTime();
        });
      case "oldest":
        return resources.sort((a: any, b: any) => {
          const dateA = new Date(a.addedDate);
          const dateB = new Date(b.addedDate);
          return dateA.getTime() - dateB.getTime();
        });
      case "type":
        return resources.sort((a: any, b: any) => {
          const typeA = a.type.toLowerCase();
          const typeB = b.type.toLowerCase();

          if (typeA < typeB) {
            return -1;
          }
          if (typeA > typeB) {
            return 1;
          }
          return 0;
        });
      default:
        return resources;
    }
  };

  const filteredResources = filterResources();

  const filterItems = [
    {
      key: "ascending",
      label: "Ascending",
      icon: <IconSortAscending size={16} />,
      onclick: () => setFilterCriteria("ascending"),
    },
    {
      key: "descending",
      label: "Descending",
      icon: <IconSortDescending size={16} />,
      onclick: () => setFilterCriteria("descending"),
    },
    {
      key: "newest",
      label: "Newest First",
      icon: <IconSortAscendingSmallBig size={16} />,
      onclick: () => setFilterCriteria("newest"),
    },
    {
      key: "oldest",
      label: "Oldest First",
      icon: <IconSortDescendingSmallBig size={16} />,
      onclick: () => setFilterCriteria("oldest"),
    },
    {
      key: "type",
      label: "By Type",
      icon: <IconSortAscendingShapes size={16} />,
      onclick: () => setFilterCriteria("type"),
    },
  ];
  let base_url = API_BASE_URL?.split("api")[0];
  const [isCopied, setisCopied] = useState(false);

  const handleCopyLink = (resource: Resource) => {
    const url = `${base_url}resources/subjects/${code}/${resource.type}/${resource._id}`;

    setisCopied(true);
    setTimeout(() => {
      setisCopied(false);
    }, 10000);
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard");
  };

  return (
    <>
      <div className="col-span-12 flex items-center gap-4">
        <div className="col-span-12 relative">
          <Input
            variant="bordered"
            type="text"
            placeholder={`Search ${
              type == "all" ? "anything" : type
            } in ${code}`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startContent={<IconSearch />}
            size="lg"
            className="w-full sm:w-72"
          />
        </div>
        <DropdownDetailed
          items={filterItems}
          button={{
            label: <IconAdjustmentsHorizontal />,
            variant: "light",
          }}
        />
      </div>
      {filteredResources
        .filter((resource) => {
          if (searchQuery === "") {
            return resource;
          } else if (
            resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (resource.description &&
              resource.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            resource.type.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return resource;
          }
        })
        .map((resource, index) => (
          <div
            key={index}
            className="flex flex-col w-full col-span-12 md:col-span-6 lg:col-span-4 relative bg-content1 shadow-small rounded-large border-small border-default-100 p-3"
          >
            {path?.includes("all") && (
              <>
                <Chip
                  variant="flat"
                  color="primary"
                  className="capitalize absolute -top-2 -right-4 backdrop-blur-sm"
                >
                  {resource.type}
                </Chip>
              </>
            )}
            <Dropdown>
              <DropdownTrigger>
                <Button
                  className="absolute right-3 top-4"
                  isIconOnly={true}
                  variant={"light"}
                >
                  <IconDotsVertical size={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions">
                {loggedIn ? (
                  <DropdownSection>
                    <DropdownItem
                      key="open"
                      startContent={<IconZoomScan size={20} />}
                      onClick={() => openFile(resource.file)}
                    >
                      Open file
                    </DropdownItem>
                    <DropdownItem
                      key="download"
                      startContent={<IconDownload size={20} />}
                      onClick={() => handleDownload(resource.file)}
                    >
                      Download
                    </DropdownItem>
                    <DropdownItem
                      key="copy"
                      color="success"
                      className="text-success"
                      startContent={<IconCopy size={20} />}
                      onClick={() => handleCopyLink(resource)}
                    >
                      Copy Link
                    </DropdownItem>
                    <DropdownItem
                      key="edit"
                      startContent={<IconPencil size={20} />}
                      onClick={() =>
                        router.push(
                          `/resources/subjects/update/${code}/${resource._id}`
                        )
                      }
                    >
                      Edit
                    </DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      startContent={<IconTrash size={20} />}
                      onClick={() => {
                        setClickedItem(resource);
                        deleteModal.onOpenChange();
                      }}
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownSection>
                ) : (
                  <DropdownSection>
                    <DropdownItem
                      key="open"
                      startContent={<IconZoomScan size={20} />}
                      onClick={() => openFile(resource.file)}
                    >
                      Open file
                    </DropdownItem>
                    <DropdownItem
                      key="download"
                      startContent={<IconDownload size={20} />}
                      onClick={() => handleDownload(resource.file)}
                    >
                      Download
                    </DropdownItem>
                    <DropdownItem
                      key="copy"
                      color="success"
                      className="text-success"
                      startContent={<IconCopy size={20} />}
                      onClick={() => handleCopyLink(resource)}
                    >
                      Copy Link
                    </DropdownItem>
                  </DropdownSection>
                )}
              </DropdownMenu>
            </Dropdown>
            <Link
              href={`/resources/subjects/${code}/${resource.type}/${resource._id}`}
            >
              <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased px-4 pb-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex max-w-[80%] flex-col gap-1">
                    <p className="text-medium whitespace-nowrap flex items-center gap-2 font-medium">
                      {resource.title}
                      {resource.file ? (
                        <IconFileIsr size={20} />
                      ) : (
                        <IconLink size={20} />
                      )}
                    </p>
                  </div>
                </div>
                <p className="pt-4 text-small text-default-500">
                  {resource.description}
                </p>
              </div>
              <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large justify-between gap-2">
                <Chip variant="flat" className="capitalize">
                  {humanReadableDate(resource.addedDate)}
                </Chip>
                {resource.file && (
                  <>
                    <Chip variant="flat">{resource.filesize} MB</Chip>
                  </>
                )}
              </div>
            </Link>
          </div>
        ))}
      <Modal
        backdrop="blur"
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Delete</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to delete {clickedItem?.title}?</p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  fullWidth
                  variant="flat"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  fullWidth
                  onPress={() => {
                    handleDelete(null, clickedItem?._id);
                    console.log(clickedItem?.title);
                  }}
                  // isLoading={isloggingOut}
                >
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default dynamic(() => Promise.resolve(Resources), { ssr: false });
