"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "sonner";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
            router.push(localStorage.getItem("redirectPath") as string);
          } else {
            router.push("/dashboard");
          }
          localStorage.removeItem("redirectPath");
        }
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
          toast.error("Invalid username");
        } else if (error.response.status === 402) {
          toast.error("Invalid password");
        } else {
          toast.error("An error occurred");
        }
        setIsLoading(false);
      }
    },
  });

  return (
    <div className="flex items-center h-screen justify-center p-4">
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
          <p className="pb-2 text-xl text-center font-medium">
            Log In to Devocode
          </p>
          <form className="flex flex-col gap-3">
            <Input
              variant="bordered"
              label="Username"
              placeholder="Enter your username"
              id="username"
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
            />
            <Input
              variant="bordered"
              label="Password"
              placeholder="Enter your password"
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <div className="flex items-center justify-between px-1 py-2">
              <Checkbox defaultSelected size="sm">
                Remember me
              </Checkbox>
              <Link href="/auth/forgot-password" color="foreground" size="sm">
                Forgot password?
              </Link>
            </div>
            <Button
              isLoading={isLoading}
              type="submit"
              color="primary"
              variant="flat"
              fullWidth
              onPress={() => formik.handleSubmit()}
              isDisabled={
                formik.values.username === "" || formik.values.password === ""
              }
            >
              Log In
            </Button>
          </form>
          <div className="flex items-center gap-4 py-2">
            <hr className="bg-divider border-none w-full h-divider flex-1" />
            <p className="shrink-0 text-tiny text-default-500">OR</p>
            <hr className="bg-divider border-none w-full h-divider flex-1" />
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="bordered">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="img"
                className="iconify iconify--flat-color-icons"
                width={24}
                height={24}
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917"
                />
                <path
                  fill="#FF3D00"
                  d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917"
                />
              </svg>
              Continue with Google
            </Button>
          </div>
          <p className="text-center text-small">
            Need to create an account?&nbsp;
            <Link href="/auth/register" size="sm">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
