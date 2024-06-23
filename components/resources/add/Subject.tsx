"use client";
import axios from "axios";
import { toast } from "sonner";
import {
  Button,
  Divider,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spacer,
  Textarea,
} from "@nextui-org/react";
import { useFormik } from "formik";
import * as Yup from "yup";

type SubjectProps = {
  onclose: () => void;
};

interface Subject {
  code: string;
  title: string;
  description: string;
  _id: string;
}

const Subject: React.FC<SubjectProps> = ({ onclose }) => {
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
    },
    validationSchema: validationSchema,
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
        <div className="flex flex-col items-start">
          <h4 className="text-large">New Subject</h4>
          <p className="text-small text-default-500">
            Add a new subject to the database
          </p>
        </div>
      </ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          label="Subject Code"
          value={formik.values.code}
          onChange={formik.handleChange}
          name="code"
          id="code"
          isClearable
          maxLength={6}
          isInvalid={formik.touched.code && formik.errors.code ? true : false}
          errorMessage={formik.touched.code && formik.errors.code}
        />
        <Input
          label="Subject Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          name="title"
          id="title"
          isClearable
          maxLength={50}
          isInvalid={formik.touched.title && formik.errors.title ? true : false}
          errorMessage={formik.touched.title && formik.errors.title}
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
      <Spacer y={2} />
      <Divider />
      <ModalFooter className="flex-col-reverse sm:flex-row">
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
