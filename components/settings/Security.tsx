"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "sonner";
import { Button, Input } from "@nextui-org/react";
import { set } from "mongoose";

const Security = () => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: (values) => {
      const errors: any = {};
      if (values.newPassword !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setProcessing(true);
      try {
        const res = await axios.post("/api/user", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success(res.data.message);
        formik.resetForm();
        router.refresh();
      } catch (error: any) {
        toast.error(error.message);
      }
      setProcessing(false);
    },
  });

  return (
    <div className="col-span-full lg:col-span-9">
      <form className="px-4 sm:px-0" onSubmit={formik.handleSubmit}>
        <h2 className="text-base font-semibold leading-7 text-base-content">
          Security
        </h2>
        <p className="mt-1 text-sm leading-6 text-base-neutral">
          Change your password and set up authentication.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-6 md:w-[50%]">
            <Input
              label="Current Password"
              name="currentPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
            />
          </div>
          <div className="sm:col-span-6 md:w-[50%]">
            <Input
              label="New Password"
              name="newPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.newPassword}
              errorMessage={formik.errors.newPassword}
            />
          </div>
          <div className="sm:col-span-6 md:w-[50%]">
            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              errorMessage={formik.errors.confirmPassword}
              isInvalid={
                formik.errors.confirmPassword === "Passwords do not match" &&
                formik.touched.confirmPassword
              }
            />
          </div>
        </div>
        <div className="divider my-10"></div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button type="button">Cancel</Button>
          <Button type="submit" color="primary" isLoading={processing}>
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Security;
