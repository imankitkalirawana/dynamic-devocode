"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { useFormik } from "formik";

type SubjectProps = {
  lastItem: any;
  onclose: () => void;
};

interface Subject {
  code: string;
  title: string;
  description: string;
  _id: string;
}

const Subject: React.FC<SubjectProps> = ({ lastItem, onclose }) => {
  const formik = useFormik({
    initialValues: {
      code: "",
      title: "",
      description: "",
    },
    onSubmit: async (values) => {
      try {
        await axios
          .post("/api/resources/subjects", values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            toast.success("Subject added successfully");
            onclose();
          });
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      }
    },
  });

  return (
    <>
      <ModalHeader className="text-lg text-center font-semibold">
        Add to {lastItem.label}
      </ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          label="Subject Code"
          value={formik.values.code}
          onChange={formik.handleChange}
          name="code"
          id="code"
          fullWidth
          required
        />
        <Input
          label="Subject Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          name="title"
          id="title"
          required
        />
        <Textarea
          id="description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          label="Description"
          rows={3}
        />
      </ModalBody>
      <ModalFooter className="flex-col sm:flex-row">
        <Button
          variant="flat"
          onClick={() => {
            onclose();
          }}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          isLoading={formik.isSubmitting}
          onClick={() => formik.handleSubmit()}
          color="primary"
          variant="flat"
          type="submit"
          fullWidth
        >
          Add
        </Button>
      </ModalFooter>
    </>
  );
};

export default Subject;
