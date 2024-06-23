"use client";
import { isLoggedIn } from "@/utils/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Subject from "./add/Subject";
import Resource from "./add/Resource";
import dynamic from "next/dynamic";
import {
  Breadcrumbs as NextUIBreadcrumbs,
  BreadcrumbItem,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  ModalBody,
} from "@nextui-org/react";
import { IconPlus } from "@tabler/icons-react";

const Breadcrumbs = () => {
  const { loggedIn } = isLoggedIn();
  const addModal = useDisclosure();
  const location = usePathname();
  const pathSegments = location?.split("/").filter((segment) => segment !== "");

  const breadcrumbItems = pathSegments?.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
    return { label: segment, link: path };
  });

  // check if breadcrumbitem contains "update"
  const update = breadcrumbItems?.find((item) => item.label === "update");

  // get the last item in the array
  let lastItem = breadcrumbItems?.slice(-1)[0];
  // if there are 2 items after subjects then get the last second item
  if (lastItem?.label != "subjects") {
    lastItem = breadcrumbItems?.slice(-2)[0];
  }

  // exclue "all" from resourceType

  return (
    <>
      <div className="text-sm breadcrumbs select-none cursor-default flex">
        <NextUIBreadcrumbs variant="solid">
          {breadcrumbItems?.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index !== breadcrumbItems.length - 1 ? (
                <Link href={item.link}>
                  {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                </Link>
              ) : (
                <span>
                  {item.label.charAt(0).toUpperCase() + item.label.slice(1)}
                </span>
              )}
            </BreadcrumbItem>
          ))}
        </NextUIBreadcrumbs>
        {loggedIn &&
          (lastItem?.label != "resources" && !update ? (
            <Button
              as="label"
              htmlFor="add_subject"
              variant="flat"
              radius="full"
              isIconOnly
              size="sm"
              className="ml-4"
              onClick={addModal.onOpenChange}
            >
              <IconPlus size={20} />
            </Button>
          ) : null)}
      </div>
      {loggedIn && (
        <>
          <Modal
            backdrop="blur"
            isOpen={addModal.isOpen}
            onOpenChange={addModal.onOpenChange}
            isDismissable={false}
            scrollBehavior="inside"
          >
            <ModalContent>
              {(onClose) => (
                <>
                  {lastItem?.label === "subjects" ? (
                    <Subject onclose={onClose} />
                  ) : (
                    <Resource lastItem={lastItem} onclose={onClose} />
                  )}
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(Breadcrumbs), { ssr: false });
