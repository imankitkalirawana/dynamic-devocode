"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";

const Security = () => {
  const router = useRouter();
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
    },
  });

  console.log(formik.values);
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
            <label htmlFor="current_password" className="label">
              <span className="label-text">Current Password</span>
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="current_password"
                type="password"
                name="currentPassword"
                required
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.currentPassword}
              />
            </div>
          </div>
          <div className="sm:col-span-6 md:w-[50%]">
            <label htmlFor="new_password" className="label">
              <span className="label-text">New Password</span>
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="new_password"
                type="password"
                name="newPassword"
                required
                className="input input-bordered w-full"
                onChange={formik.handleChange}
                value={formik.values.newPassword}
              />
            </div>
          </div>
          <div className="sm:col-span-6 md:w-[50%]">
            <label htmlFor="confirm_password" className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <input
                id="confirm_password"
                name="confirmPassword"
                type="password"
                required
                className={`input input-bordered w-full ${
                  formik.errors.confirmPassword ? "input-error" : ""
                }`}
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
              />
            </div>
            {formik.errors.confirmPassword && (
              <p className="mt-1 text-xs text-error">
                {formik.errors.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <div className="divider my-10"></div>
        <div className="mt-6 flex items-center justify-end gap-2">
          <button type="button" className="btn btn-ghost btn-sm">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Security;
