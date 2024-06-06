"use client";

import ForgotPassword from "@/assets/ForgotPassword";
import { isLoggedIn } from "@/utils/auth";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type error = {
  message: string;
  status: number;
};

const Page = () => {
  const { loggedIn } = isLoggedIn();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<error | null>(null);

  useEffect(() => {
    if (loggedIn) {
      window.location.href = "/dashboard";
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post("/api/auth/login", values);
        const { data } = response;
        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("userData", JSON.stringify(data));
          localStorage.setItem("userId", data.userId);
          if (localStorage.getItem("redirectPath")) {
            window.location.href = localStorage.getItem(
              "redirectPath"
            ) as string;
          } else {
            window.location.href = "/dashboard";
          }
          localStorage.removeItem("redirectPath");
        }
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
          setError({ message: "Invalid username", status: 401 });
          toast.error("Invalid username");
        } else if (error.response.status === 402) {
          setError({ message: "Invalid password", status: 402 });
          toast.error("Invalid password");
        } else {
          setError({ message: "An error occurred", status: 500 });
          toast.error("An error occurred");
        }
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <div className="hero min-h-screen bg-base-200 p-4">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={formik.handleSubmit}>
            <div>
              <h2 className="text-2xl font-bold text-center">
                Welcome to Devocode
              </h2>
            </div>
            <div className="form-control">
              <Input
                label="Username"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
              />
            </div>
            <div className="form-control">
              <Input
                label="Password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-control justify-end">
              <Button isLoading={isLoading} type="submit" color="primary">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <form className="modal-box max-w-96">
          <div className="max-w-40 mx-auto flex mb-8">
            <ForgotPassword />
          </div>
          <div className="flex flex-col gap-4">
            <div className="label">
              <span className="label-text">Enter your email address</span>
            </div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
            <button className="btn btn-primary">Send Reset Link</button>
          </div>
        </form>

        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
};

export default Page;
