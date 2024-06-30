"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Image,
  Input,
  Link,
} from "@nextui-org/react";
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
      <Card className="p-4 w-96">
        <CardHeader className="items-center flex-col justify-center">
          <p className="text-lg">Log In to Devocode</p>
          <Image
            src={"/animated-icons/login.gif"}
            width={100}
            height={100}
            alt="Logout animation"
          />
        </CardHeader>
        <CardBody className="flex flex-col gap-3">
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
        </CardBody>
        <CardFooter className="flex-col">
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
          <div className="flex items-center gap-4 py-2">
            <hr className="bg-divider border-none w-full h-divider flex-1" />
            <p className="shrink-0 text-tiny text-default-500">OR</p>
            <hr className="bg-divider border-none w-full h-divider flex-1" />
          </div>
          <p className="text-center text-small">
            Need to create an account?&nbsp;
            <Link href="/auth/register" size="sm">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
