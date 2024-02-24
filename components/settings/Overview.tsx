"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import OSkeleton from "./OSkeleton";

type User = {
  name: string;
  username: string;
  email: string;
  phone: string;
  about: string;
  address: string;
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
    <div className="col-span-full lg:col-span-9">
      <div className="px-4 flex sm:px-0">
        <div className="avatar placeholder mr-4">
          <div className="bg-neutral text-neutral-content rounded-full w-12 h-12">
            <span>AK</span>
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-semibold leading-7 ">
            Profile Overview
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 ">
            Personal details and documents.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <ul className="">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 ">Full name</dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 text-end">
              {user.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 ">Username</dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 text-end">
              {user.username}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 ">Email address</dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 text-end">
              {user.email}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 ">Phone</dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 text-end">
              {user.phone}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 ">About</dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 text-end">
              {user.about ? user.about : "-"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 ">Address</dt>
            <dd className="mt-1 text-sm leading-6  sm:col-span-2 sm:mt-0 text-end">
              {user.address ? user.address : "-"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 ">Attachments</dt>
            <dd className="mt-2 text-sm  sm:col-span-2 sm:mt-0">
              <ul role="list" className="rounded-md">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                      />
                    </svg>

                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">pan_card.pdf</span>
                      <span className="flex-shrink-0 ">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="btn btn-sm btn-ghost">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                      />
                    </svg>

                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">
                        aadhaar_card.pdf
                      </span>
                      <span className="flex-shrink-0 ">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="btn btn-sm btn-ghost">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
