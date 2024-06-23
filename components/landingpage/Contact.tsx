// import { Switch } from "@headlessui/react";
"use client";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import * as Yup from "yup";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

const Contact = () => {
  const submittedModal = useDisclosure();
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validationSchema: Yup.object({
      firstname: Yup.string()
        .required("First name is required")
        .min(3, "Too short"),
      lastname: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^[0-9]+$/, "Invalid phone number"),
      message: Yup.string()
        .required("Message is required")
        .min(10, "Too short"),
    }),
    onSubmit: async (values) => {
      try {
        await axios.post("/api/mail/contact", values).then(() => {
          submittedModal.onOpenChange();
        });
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-60"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-secondary to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Contact Us
          </h2>
          <p className="mt-2 text-lg leading-8">
            We are here to help you. Please feel free to contact us. We will get
            back to you as soon as possible.
          </p>
        </div>
        <Card
          className="mx-auto mt-16 max-w-xl sm:mt-20 bg-transparent"
          shadow="none"
        >
          <CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstname"
              id="firstname"
              autoComplete="given-name"
              labelPlacement="outside"
              placeholder="eg. John"
              onChange={formik.handleChange}
              value={formik.values.firstname}
              isInvalid={
                formik.touched.firstname && formik.errors.firstname
                  ? true
                  : false
              }
              errorMessage={formik.touched.firstname && formik.errors.firstname}
            />
            <Input
              label="Last Name"
              name="lastname"
              id="lastname"
              labelPlacement="outside"
              placeholder="eg. Doe"
              autoComplete="family-name"
              onChange={formik.handleChange}
              value={formik.values.lastname}
              isInvalid={
                formik.touched.lastname && formik.errors.lastname ? true : false
              }
              errorMessage={formik.touched.lastname && formik.errors.lastname}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              labelPlacement="outside"
              placeholder="eg. johndoe@example.com"
              autoComplete="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              isInvalid={
                formik.touched.email && formik.errors.email ? true : false
              }
              errorMessage={formik.touched.email && formik.errors.email}
            />

            <Input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              label="Phone Number"
              labelPlacement="outside"
              autoComplete="tel"
              placeholder="eg. 1234567890"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
              isInvalid={
                formik.touched.phoneNumber && formik.errors.phoneNumber
                  ? true
                  : false
              }
              errorMessage={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
              startContent={
                <Dropdown>
                  <DropdownTrigger>
                    <Button
                      className="text-default-500"
                      endContent={
                        <span className="hidden sm:flex">
                          <Icon icon="solar:alt-arrow-down-linear" />
                        </span>
                      }
                      size="sm"
                      variant="light"
                    >
                      IN
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu selectionMode="single">
                    <DropdownItem key="can-view">Can view</DropdownItem>
                    <DropdownItem key="can-edit">Can edit</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              }
            />

            <Textarea
              name="message"
              id="message"
              rows={4}
              label="Message"
              labelPlacement="outside"
              placeholder="Type your message here..."
              onChange={formik.handleChange}
              value={formik.values.message}
              className="col-span-full"
              isInvalid={
                formik.touched.message && formik.errors.message ? true : false
              }
              errorMessage={formik.touched.message && formik.errors.message}
            />
          </CardBody>
          <CardFooter>
            <Button
              type="submit"
              isLoading={formik.isSubmitting}
              color="primary"
              variant="flat"
              fullWidth
              onPress={() => formik.handleSubmit()}
            >
              Let's Talk
            </Button>
          </CardFooter>
        </Card>
      </div>
      <Modal
        backdrop="blur"
        isOpen={submittedModal.isOpen}
        // isOpen={true}
        onOpenChange={submittedModal.onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="text-center justify-center">
            <h3 className="text-2xl font-bold">Thank you!</h3>
          </ModalHeader>
          <ModalBody>
            <div className="text-center">
              <p className="mt-2">
                Your message has been sent successfully. We will get back to you
                as soon as possible.
              </p>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              color="primary"
              className="mt-4"
              onPress={submittedModal.onOpenChange}
              fullWidth
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Contact;
