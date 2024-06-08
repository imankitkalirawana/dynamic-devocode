"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import OSkeleton from "./OSkeleton";
import { Button, Card } from "@nextui-org/react";

type User = {
  name: string;
  username: string;
  email: string;
  phone: string;
  about: string;
  address: string;
  role: string;
};

const Overview = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    // fetch user data
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();

    if (localStorage.getItem("token") === null) {
      router.push("/auth/login");
    }
  }, []);

  if (!user)
    return (
      <>
        <OSkeleton />
      </>
    );

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full" tabIndex={-1}>
        <div className="flex p-3 z-10 w-full items-center shrink-0 overflow-inherit color-inherit subpixel-antialiased rounded-t-large justify-between px-4">
          <div className="flex flex-col items-start">
            <p className="text-large">Personal Details</p>
            <p className="text-small text-default-500">
              Manage your personal details
            </p>
          </div>
          <Button color="primary" variant="flat">
            Edit
          </Button>
        </div>
        <div className="relative flex w-full p-3 flex-auto flex-col place-content-inherit align-items-inherit h-auto break-words text-left overflow-y-auto subpixel-antialiased space-y-2 px-6">
          <div className="flex items-center justify-between py-2">
            <div className="text-small text-default-500">Full Name</div>
            <div className="text-small font-medium">{user.name}</div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="text-small text-default-500">Username</div>
            <div className="text-small font-medium">{user.username}</div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="text-small text-default-500">Address</div>
            <div className="text-small font-medium">{user.address}</div>
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="text-small text-default-500">Phone Number</div>
            <div className="text-small font-medium">{user.phone}</div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="text-small text-default-500">Email</div>
            <div className="text-small font-medium">{user.email}</div>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="text-small text-default-500">Role</div>
            <div className="text-small font-medium capitalize">{user.role}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Overview;
