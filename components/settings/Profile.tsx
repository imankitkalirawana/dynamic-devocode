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
  const [processing, setProcessing] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
      setProcessing(true);
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
      setProcessing(false);
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
    <div className="col-span-full lg:col-span-9">
      <form className="px-4 sm:px-0" onSubmit={formik.handleSubmit}>
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-base-content">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-base-neutral">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6 md:w-[50%]">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <div className="mt-2">
                <Input
                  name="username"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  autoComplete="username"
                  placeholder="username"
                  startContent={
                    <div className="pointer-events-none flex items-center">
                      <span className="text-default-400 text-small">
                        www.devocode.in/
                      </span>
                    </div>
                  }
                />
              </div>
            </div>

            <div className="col-span-full">
              <Textarea
                name="about"
                rows={3}
                onChange={formik.handleChange}
                value={formik.values.about}
                label="About"
              />
            </div>
          </div>
          <div className="divider"></div>
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-base-content">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-base-neutral">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Full Name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  autoComplete="given-name"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Email address"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  autoComplete="email"
                  disabled
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <Input
                  label="Phone"
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                  autoComplete="phone"
                  isDisabled
                />
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                <Input
                  label="Address"
                  name="address"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  autoComplete="address"
                />
              </div>
            </div>
          </div>
          <div className="divider"></div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2">
          <Button onPress={onOpen} variant="flat" color="danger">
            Delete Account
          </Button>

          <div className="flex gap-2">
            <Button type="button" onClick={fetchUser}>
              Cancel
            </Button>
            <Button
              type="submit"
              color="primary"
              isLoading={processing}
              disabled={processing}
            >
              Update
            </Button>
          </div>
        </div>

        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
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
                  <Button color="default" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="danger"
                    isDisabled={
                      formik.values.confirmusername !==
                        formik.values.username || isDeleting
                    }
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
      </form>
    </div>
  );
};

export default Profile;
