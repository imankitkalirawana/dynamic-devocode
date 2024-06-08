"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PSkeleton from "./PSkeleton";
import { toast } from "sonner";
import { useFormik } from "formik";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Avatar,
  CardFooter,
} from "@nextui-org/react";

interface User {
  _id: string;
  name: string;
  profile: string;
  username: string;
  email: string;
  phone: string;
  about: string;
  role: string;
  address: string;
  createdat: string;
  updatedat: string;
  theme: string;
}

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteModal = useDisclosure();

  const formik = useFormik({
    initialValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      about: user.about,
      address: user.address,
      confirmusername: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.put("/api/user", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success(res.data.message);
        router.refresh();
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });
  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
      formik.setValues({
        ...formik.values,
        name: res.data.name,
        username: res.data.username,
        email: res.data.email,
        phone: res.data.phone,
        about: res.data.about,
        address: res.data.address,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    if (localStorage.getItem("token") === null) {
      router.push("/auth/login");
    }
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Account deleted successfully");
      localStorage.removeItem("token");
      router.push("/auth/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  console.log(formik.values);

  if (!user)
    return (
      <>
        <PSkeleton />
      </>
    );

  return (
    <>
      <div className="flex items-center justify-center p-4">
        <Card className="w-full">
          <CardBody>
            <div className="p-3 z-10 w-full justify-start shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large flex flex-col items-start px-4 pb-0 pt-4">
              <p className="text-large">Account Details</p>
              <div className="flex gap-4 py-4">
                <Avatar isBordered name={user.name} />
                <div className="flex flex-col items-start justify-center">
                  <p className="font-medium">{user.name}</p>
                  <span className="text-small text-default-500 capitalize">
                    {user.role}
                  </span>
                </div>
              </div>
              <p className="text-small text-default-400">
                The photo will be used for your profile, and will be visible to
                other users of the platform.
              </p>
            </div>
            <div className="relative w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                labelPlacement="outside"
                label="Full Name"
                placeholder="Enter your name"
                value={formik.values.name}
                onChange={formik.handleChange}
                name="name"
                id="name"
              />
              <Input
                labelPlacement="outside"
                label="Username"
                placeholder="Enter your username"
                value={formik.values.username}
                onChange={formik.handleChange}
                name="username"
                id="username"
              />
              <Input
                labelPlacement="outside"
                label="Email"
                placeholder="Enter your email"
                value={formik.values.email}
                onChange={formik.handleChange}
                name="email"
                id="email"
              />
              <Input
                labelPlacement="outside"
                label="Phone Number"
                placeholder="Enter your phone number"
                value={formik.values.phone}
                onChange={formik.handleChange}
                name="phone"
                id="phone"
              />
              <Textarea
                labelPlacement="outside"
                label="About"
                placeholder="Tell us about yourself"
                value={formik.values.about}
                onChange={formik.handleChange}
                name="about"
                id="about"
              />
              <Textarea
                labelPlacement="outside"
                label="Address"
                placeholder="Enter your address"
                value={formik.values.address}
                onChange={formik.handleChange}
                name="address"
                id="address"
              />
            </div>
            <CardFooter className="flex justify-between items-center">
              <Button
                variant="light"
                color="danger"
                onPress={deleteModal.onOpenChange}
              >
                Delete Account
              </Button>
              <div className="space-x-2 flex items-center">
                <Button variant="flat">Cancel</Button>
                <Button
                  variant="flat"
                  color="primary"
                  onPress={() => formik.handleSubmit()}
                  isDisabled={
                    formik.values.name === "" ||
                    formik.values.username === "" ||
                    formik.values.email === "" ||
                    formik.values.phone === "" ||
                    formik.values.about === "" ||
                    formik.values.address === "" ||
                    formik.isSubmitting
                  }
                  isLoading={formik.isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </CardFooter>
          </CardBody>
        </Card>
      </div>
      <Modal
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <p>
                  Enter <i>{formik.values.username}</i> to delete
                </p>
              </ModalHeader>
              <ModalBody>
                <Input
                  type="confirmusername"
                  name="confirmusername"
                  onChange={formik.handleChange}
                  value={formik.values.confirmusername}
                  placeholder={formik.values.username}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="default"
                  fullWidth
                  variant="light"
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  fullWidth
                  isDisabled={
                    formik.values.confirmusername !== formik.values.username ||
                    isDeleting
                  }
                  isLoading={isDeleting}
                  onPress={() => {
                    handleDelete();
                  }}
                >
                  Delete Account
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Profile;
