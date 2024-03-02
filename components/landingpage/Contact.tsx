// import { Switch } from "@headlessui/react";
"use client";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import * as Yup from "yup";

const Contact = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      setIsSubmitting(true);
      try {
        const res = await axios.post("/api/mail/contact", values);
        setIsSubmitted(true);
        formik.resetForm();
      } catch (error) {
        console.error(error);
      }
      setIsSubmitting(false);
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
        <form
          className="mx-auto mt-16 max-w-xl sm:mt-20"
          onSubmit={formik.handleSubmit}
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="firstname" className="label">
                <span className="label-text">First Name</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  autoComplete="given-name"
                  className={`input input-bordered w-full bg-transparent ${
                    formik.errors.firstname && formik.touched.firstname
                      ? "input-error"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  value={formik.values.firstname}
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastname" className="label">
                <span className="label-text">Last Name</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  autoComplete="family-name"
                  className={`input input-bordered w-full bg-transparent ${
                    formik.errors.lastname && formik.touched.lastname
                      ? "input-error"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  value={formik.values.lastname}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="email" className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className={`input input-bordered w-full bg-transparent ${
                    formik.errors.email && formik.touched.email
                      ? "input-error"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phoneNumber" className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <div className="relative mt-2.5">
                <div className="absolute inset-y-0 left-0 flex items-center">
                  <label htmlFor="country" className="sr-only">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent bg-none py-0 pl-4 pr-9 ring-0 outline-none border-none sm:text-sm"
                  >
                    <option>IN</option>
                    <option>US</option>
                    <option>EU</option>
                  </select>
                </div>
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phoneNumber"
                  autoComplete="tel"
                  className={`input input-bordered w-full pl-24 bg-transparent ${
                    formik.errors.phoneNumber && formik.touched.phoneNumber
                      ? "input-error"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="label">
                <span className="label-text">Message</span>
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className={`textarea textarea-bordered w-full bg-transparent ${
                    formik.errors.message && formik.touched.message
                      ? "textarea-error"
                      : ""
                  }`}
                  onChange={formik.handleChange}
                  value={formik.values.message}
                />
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button type="submit" className="btn btn-primary w-full">
              {isSubmitting ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Let's Talk"
              )}
            </button>
          </div>
        </form>
      </div>
      {/* Submitted modal */}
      {isSubmitted && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-96 p-8 bg-base-100 rounded-lg">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                Thank you {formik.values.firstname}!
              </h2>
              <button
                className="btn btn-ghost"
                onClick={() =>
                  setIsSubmitted((prev) => {
                    return !prev;
                  })
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-4">
              We have received your message. We will get back to you as soon as
              possible.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Contact;
