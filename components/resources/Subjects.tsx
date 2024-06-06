"use client";
import Trash from "@/assets/Trash";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { isLoggedIn } from "@/utils/auth";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  IconAdjustmentsHorizontal,
  IconCopy,
  IconDotsVertical,
  IconDownload,
  IconPencil,
  IconSearch,
  IconSortAscending,
  IconSortAscendingSmallBig,
  IconSortDescending,
  IconSortDescendingSmallBig,
  IconTrash,
  IconZoomScan,
} from "@tabler/icons-react";
import DropdownDetailed from "../common/DropdownDetailed";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  code,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import API_BASE_URL from "@/utils/config";

type Subject = {
  _id: string;
  title: string;
  code: string;
  description: string;
  addedDate: string;
};

type SubjectsProps = {
  subjects: Subject[];
};

const Subjects: React.FC<SubjectsProps> = ({ subjects }) => {
  const router = useRouter();
  const { loggedIn } = isLoggedIn();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCriteria, setFilterCriteria] = useState("");
  const deleteModal = useDisclosure();
  const [clickedItem, setClickedItem] = useState<Subject | null>(null);

  useEffect(() => {
    const savedFilterCriteria = localStorage.getItem("subjectFilterCriteria");
    if (savedFilterCriteria) {
      setFilterCriteria(savedFilterCriteria);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("subjectFilterCriteria", filterCriteria);
  }, [filterCriteria]);

  const humanReadableDate = (addedDate: string) => {
    return new Date(addedDate).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const handleDelete = async (code: string | undefined) => {
    try {
      const modal = document.getElementById(`delete_modal_${code}`);
      await axios.delete(`/api/resources/subjects/${code}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      deleteModal.onClose();
      toast.success("Subject deleted successfully");
      router.refresh();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const filterSubjects = () => {
    switch (filterCriteria) {
      case "ascending":
        return subjects.sort((a, b) => {
          const codeA = a.code.toLowerCase();
          const codeB = b.code.toLowerCase();
          if (codeA < codeB) {
            return -1;
          }
          if (codeA > codeB) {
            return 1;
          }
          return 0;
        });
      case "descending":
        return subjects.sort((a, b) => {
          const codeA = a.code.toLowerCase();
          const codeB = b.code.toLowerCase();
          if (codeA > codeB) {
            return -1;
          }
          if (codeA < codeB) {
            return 1;
          }
          return 0;
        });
      case "newest":
        return subjects.sort((a, b) => {
          const dateA = new Date(a.addedDate);
          const dateB = new Date(b.addedDate);
          return dateB.getTime() - dateA.getTime();
        });
      case "oldest":
        return subjects.sort((a, b) => {
          const dateA = new Date(a.addedDate);
          const dateB = new Date(b.addedDate);
          return dateA.getTime() - dateB.getTime();
        });
      default:
        return subjects;
    }
  };

  const filteredSubjects = filterSubjects();

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
  ];

  let base_url = API_BASE_URL?.split("api")[0];
  const [isCopied, setisCopied] = useState(false);

  const handleCopyLink = (subject: Subject) => {
    const url = `${base_url}resources/subjects/${subject.code}/all`;

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
            placeholder={`Search subjects by code or title`}
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
      {filteredSubjects
        .filter(
          (subject) =>
            subject.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subject.code.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((subject, index) => (
          <div
            key={index}
            className="flex flex-col w-full col-span-12 md:col-span-6 lg:col-span-4 relative bg-content1 shadow-small rounded-large border-small border-default-100 p-3"
          >
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
                      key="copy"
                      color="success"
                      className="text-success"
                      startContent={<IconCopy size={20} />}
                      onClick={() => handleCopyLink(subject)}
                    >
                      Copy Link
                    </DropdownItem>
                    <DropdownItem
                      key="edit"
                      startContent={<IconPencil size={20} />}
                      onClick={() =>
                        router.push(
                          `/resources/subjects/update/${subject.code}/`
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
                        setClickedItem(subject);
                        deleteModal.onOpenChange();
                      }}
                    >
                      Delete file
                    </DropdownItem>
                  </DropdownSection>
                ) : (
                  <DropdownSection>
                    <DropdownItem
                      key="copy"
                      color="success"
                      className="text-success"
                      startContent={<IconCopy size={20} />}
                      onClick={() => handleCopyLink(subject)}
                    >
                      Copy Link
                    </DropdownItem>
                  </DropdownSection>
                )}
              </DropdownMenu>
            </Dropdown>
            <Link href={`/resources/subjects/${subject.code}/all`}>
              <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased px-4 pb-1">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex max-w-[80%] flex-col gap-1">
                    <p className="text-medium whitespace-nowrap flex items-center gap-2 font-medium">
                      {subject.code}
                    </p>
                  </div>
                </div>
                <p className="pt-4 text-small text-default-500">
                  {subject.title}
                </p>
              </div>
              <div className="p-3 h-auto flex w-full items-center overflow-hidden color-inherit subpixel-antialiased rounded-b-large justify-between gap-2">
                <Chip className="capitalize">
                  {humanReadableDate(subject.addedDate)}
                </Chip>
              </div>
            </Link>
          </div>
        ))}
      <Modal
        backdrop="blur"
        size="xs"
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
                    handleDelete(clickedItem?.code);
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

// export default Subjects;
export default dynamic(() => Promise.resolve(Subjects), { ssr: false });
