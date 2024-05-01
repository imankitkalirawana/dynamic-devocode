"use client";

import ForgotPassword from "@/assets/ForgotPassword";
import { isLoggedIn } from "@/utils/auth";
import axios from "axios";
import { useEffect, useState } from "react";

type error = {
  message: string;
  status: number;
};

const Page = () => {
  const { loggedIn } = isLoggedIn();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<error | null>(null);

  useEffect(() => {
    if (loggedIn) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      const { data } = response;
      if (data) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data));
        localStorage.setItem("userId", data.userId);
        if (localStorage.getItem("redirectPath")) {
          window.location.href = localStorage.getItem("redirectPath") as string;
        } else {
          window.location.href = "/dashboard";
        }
        localStorage.removeItem("redirectPath");
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.status === 401) {
        setError({ message: "Invalid username", status: 401 });
      } else if (error.response.status === 402) {
        setError({ message: "Invalid password", status: 402 });
      } else {
        setError({ message: "An error occurred", status: 500 });
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="hero min-h-screen bg-base-200 p-4">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                className="input input-bordered"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <div className="label">
                <span className="label-text-alt text-error">
                  {error?.status === 401 ? error.message : ""}
                </span>
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <span className="label-text-alt text-error">
                  {error?.status === 402 ? error.message : ""}
                </span>
                <label
                  className="label-text-alt link link-hover"
                  htmlFor="my_modal_7"
                >
                  Forgot password
                </label>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">
                {isLoading ? (
                  <span className="loading loading-dots loading-md"></span>
                ) : (
                  "Login"
                )}
              </button>
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
