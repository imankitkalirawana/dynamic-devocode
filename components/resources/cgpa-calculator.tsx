"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Tooltip,
  Divider,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Avatar,
} from "@nextui-org/react";
import { useFormik } from "formik";
import { IconGraph, IconPlus, IconX } from "@tabler/icons-react";
import * as Yup from "yup";

interface SubjectRow {
  subject: string;
  grade: string;
  credit: number;
}

interface FormValues {
  subjectRow: SubjectRow[];
}

export default function CgpaCalculator() {
  const [cgpa, setCGPA] = useState<string | null>(null); // State to store calculated CGPA
  const cgpaModal = useDisclosure();

  const validationSchema = Yup.object().shape({
    subjectRow: Yup.array().of(
      Yup.object().shape({
        grade: Yup.string()
          .matches(
            /^(O|A\+|A|B\+|B|C|D|F|G|I)$/i,
            "Valid grades are O, A+, A, B+, B, C, D, F, G, I"
          )
          .required("Grade is required"),
        credit: Yup.number()
          .required("Credit is required")
          .min(0, "Credit must be greater than or equal to 0")
          .max(10, "Credit must be less than or equal to 10"),
      })
    ),
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      subjectRow: [{ subject: "1", grade: "O", credit: 1 }],
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const calculateCGPA = () => {
    if (!formik.isValid) {
      formik.validateForm();
      return;
    }

    let totalCredits = 0;
    let totalGradePoints = 0;

    formik.values.subjectRow.forEach((subject) => {
      const gradePoint = getGradePoint(subject.grade); // Function to convert grade to grade point
      const credit = subject.credit;

      if (!isNaN(credit) && gradePoint !== null) {
        totalGradePoints += gradePoint * credit;
        totalCredits += credit;
      }
    });

    if (totalCredits > 0) {
      const calculatedCGPA = totalGradePoints / totalCredits;
      // remove trailing zeros if the CGPA is an integer else keep 2 decimal places
      setCGPA(
        calculatedCGPA % 1 === 0
          ? calculatedCGPA.toFixed(0)
          : calculatedCGPA.toFixed(2)
      );
      // setCGPA(calculatedCGPA.toFixed(2));
      cgpaModal.onOpen();
    } else {
      setCGPA(null); // Reset CGPA if no valid credits
    }
  };

  const getGradePoint = (grade: string) => {
    // Define your grade to grade point mapping here
    switch (grade.toUpperCase()) {
      case "O":
        return 10;
      case "A+":
        return 9;
      case "A":
        return 8;
      case "B+":
        return 7;
      case "B":
        return 6;
      case "C":
        return 5;
      case "D":
        return 4;
      case "E":
      case "F":
      case "G":
      case "I":
        return 0;
      default:
        return null; // Invalid grade
    }
  };

  const addNewRow = () => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      subjectRow: [
        ...prevValues.subjectRow,
        {
          subject: `${formik.values.subjectRow.length + 1}`,
          grade: "O",
          credit: 1,
        },
      ],
    }));
  };

  const removeRow = (index: number) => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      subjectRow: prevValues.subjectRow.filter((_, i) => i !== index),
    }));
  };

  return (
    <>
      <main className="col-span-full">
        <Card className="p-4">
          <CardHeader className="flex p-3 z-10 w-full justify-start items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large">
            <div className="flex items-center gap-3">
              <Avatar showFallback fallback={<IconGraph />}></Avatar>
              <p className="text-large font-medium">CGPA Calculator</p>
            </div>
          </CardHeader>{" "}
          <CardBody className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AnimatePresence initial={false}>
              {formik.values.subjectRow.map((_row, index) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider className="col-span-full" />}
                  {formik.values.subjectRow.length > 1 && (
                    <Button
                      isIconOnly
                      radius="full"
                      variant="light"
                      onPress={() => removeRow(index)}
                      className="flex md:hidden self-end justify-self-end -mb-8"
                      color="danger"
                      size="sm"
                    >
                      <IconX size={16} />
                    </Button>
                  )}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    <Input
                      name={`subjectRow[${index}].subject`}
                      placeholder="eg: CSE101"
                      value={formik.values.subjectRow[index].subject}
                      onChange={formik.handleChange}
                      label="Subject"
                      labelPlacement="outside"
                      isInvalid={
                        // @ts-ignore
                        formik.errors.subjectRow?.[index]?.subject
                          ? true
                          : false
                      }
                      // @ts-ignore
                      errorMessage={formik.errors.subjectRow?.[index]?.subject}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                    className="flex flex-col gap-2"
                  >
                    <Input
                      name={`subjectRow[${index}].grade`}
                      placeholder="eg: A+"
                      value={formik.values.subjectRow[index].grade}
                      onChange={formik.handleChange}
                      label="Grade"
                      labelPlacement="outside"
                      isInvalid={
                        // @ts-ignore
                        formik.errors.subjectRow?.[index]?.grade ? true : false
                      }
                      // @ts-ignore
                      errorMessage={formik.errors.subjectRow?.[index]?.grade}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2, delay: 0.2 }}
                    className="flex flex-col gap-2"
                  >
                    <Input
                      name={`subjectRow[${index}].credit`}
                      placeholder="eg: 4"
                      type="number"
                      min={0}
                      max={10}
                      // @ts-ignore
                      value={formik.values.subjectRow[index].credit}
                      onChange={formik.handleChange}
                      label="Credit"
                      labelPlacement="outside"
                      isInvalid={
                        // @ts-ignore
                        formik.errors.subjectRow?.[index]?.credit ? true : false
                      }
                      // @ts-ignore
                      errorMessage={formik.errors.subjectRow?.[index]?.credit}
                      endContent={
                        formik.values.subjectRow.length > 1 && (
                          <Button
                            isIconOnly
                            radius="full"
                            variant="light"
                            onPress={() => removeRow(index)}
                            className="hidden md:flex"
                            color="danger"
                          >
                            <IconX size={16} />
                          </Button>
                        )
                      }
                    />
                  </motion.div>
                </React.Fragment>
              ))}
            </AnimatePresence>
            <Tooltip placement="left" color="primary" content="Add New Subject">
              <Button
                size="sm"
                className="self-end justify-self-end col-span-full"
                isIconOnly
                radius="full"
                onPress={addNewRow}
                variant="flat"
                color="primary"
              >
                <IconPlus size={18} />
              </Button>
            </Tooltip>
          </CardBody>
          <CardFooter className="gap-2 flex-col-reverse sm:flex-row">
            <Button
              onClick={() => {
                formik.setValues({
                  subjectRow: [{ subject: "1", grade: "O", credit: 1 }],
                });
                setCGPA(null);
              }}
              variant="flat"
              fullWidth
            >
              Reset
            </Button>
            <Button
              variant="flat"
              fullWidth
              color="primary"
              onClick={calculateCGPA}
            >
              Calculate
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Modal
        isOpen={cgpaModal.isOpen}
        onOpenChange={cgpaModal.onOpenChange}
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalBody className="min-h-48 justify-center items-center">
            <p className="text-center text-7xl font-bold after:content-['cgpa'] after:text-lg after:font-normal">
              {cgpa ? cgpa : "Invalid CGPA"}
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
