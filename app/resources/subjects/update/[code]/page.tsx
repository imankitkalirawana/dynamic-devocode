"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/utils/auth";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import {
  IconArchive,
  IconArchiveOff,
  IconCheck,
  IconTrash,
} from "@tabler/icons-react";

interface Props {
  params: {
    code: string;
  };
}

interface Subject {
  _id: string;
  code: string;
  title: string;
  description: string;
  isArchived: boolean;
}

const Page = ({ params }: Props) => {
  const { loggedIn } = isLoggedIn();
  const router = useRouter();
  const location = usePathname();
  const deleteModal = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const getSubject = async () => {
      const res = await axios.get(`/api/resources/subjects/${params.code}`);
      formik.setValues(res.data);
    };
    if (!loggedIn) {
      router.push("/auth/login");
      // set route to localStorage
      localStorage.setItem("redirectPath", location || "");
    }
    getSubject();
  }, []);

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .min(3, "Subject code must be atleast 3 characters")
      .max(6, "Subject code must be atmost 6 characters")
      .required("Subject code is required"),
    title: Yup.string()
      .min(3, "Subject title must be 3 characters")
      .max(50, "Subject title must be 50 characters")
      .required("Subject title is required"),
  });

  const formik = useFormik({
    initialValues: {
      code: "",
      title: "",
      description: "",
      isArchived: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await axios
          .put(`/api/resources/subjects/${params.code}`, values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            toast.success("Subject updated");
            // router.push("/resources/subjects");
          });
      } catch (error: any) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    },
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await axios.delete(`/api/resources/subjects/${params.code}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(res.data.message);
      router.push("/resources/subjects");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
    setIsDeleting(false);
  };

  return (
    <>
      <div className="min-h-screen p-4">
        <Card className="p-4">
          <CardHeader>
            <h3 className="text-lg font-semibold">Update Subject</h3>
          </CardHeader>
          <CardBody className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <Input
              label="Code"
              type="text"
              id="code"
              name="code"
              value={formik.values.code}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.code && formik.errors.code ? true : false
              }
              errorMessage={formik.touched.code && formik.errors.code}
              maxLength={6}
            />
            <Input
              label="Title"
              type="text"
              id="title"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              isInvalid={
                formik.touched.title && formik.errors.title ? true : false
              }
              errorMessage={formik.touched.title && formik.errors.title}
            />

            <Textarea
              label="Description"
              id="description"
              name="description"
              className="col-span-full"
              value={formik.values.description}
              onChange={formik.handleChange}
            />

            <Switch
              name="isArchived"
              id="isArchived"
              isSelected={formik.values.isArchived}
              onChange={formik.handleChange}
              endContent={<IconArchiveOff size={16} />}
              startContent={<IconArchive size={16} />}
              color="danger"
            >
              Archive
            </Switch>
          </CardBody>
          <Divider className="my-2" />
          <CardFooter className="justify-end gap-2 flex-col-reverse sm:flex-row">
            <Button
              type="button"
              variant="flat"
              color="danger"
              startContent={<IconTrash size={16} />}
              onClick={deleteModal.onOpenChange}
            >
              Delete
            </Button>
            <Button
              variant="solid"
              isLoading={formik.isSubmitting}
              isDisabled={formik.isSubmitting}
              color="primary"
              type="submit"
              startContent={
                formik.isSubmitting ? null : <IconCheck size={18} />
              }
              onPress={() => formik.handleSubmit()}
            >
              Update
            </Button>
          </CardFooter>
        </Card>
      </div>
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
                <p>Are you sure you want to delete {formik.values.title}?</p>
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
                    handleDelete();
                  }}
                  isLoading={isDeleting}
                  isDisabled={isDeleting}
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

export default Page;
