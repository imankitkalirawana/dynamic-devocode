"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import PSkeleton from "./PSkeleton";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";

interface User {
  _id: string;
  name: string;
  profile: string;
  username: string;
  email: string;
  phone: string;
  about: string;
  role: string;
  address: string;
  createdat: string;
  updatedat: string;
  theme: string;
}

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState<User>({} as User);
  const [isDeleting, setIsDeleting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      about: user.about,
      address: user.address,
      confirmusername: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await axios.put("/api/user", values, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        toast.success(res.data.message);
        router.refresh();
      } catch (error: any) {
        console.log(error);
        toast.error(error.message);
      }
    },
  });

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
        formik.setValues({
          ...formik.values,
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
          phone: res.data.phone,
          about: res.data.about,
          address: res.data.address,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
    if (localStorage.getItem("token") === null) {
      router.push("/auth/login");
    }
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await axios.delete("/api/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success("Account deleted successfully");
      localStorage.removeItem("token");
      router.push("/auth/login");
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user)
    return (
      <>
        <PSkeleton />
      </>
    );

  return (
    <div className="col-span-full lg:col-span-9">
      <form className="px-4 sm:px-0" onSubmit={formik.handleSubmit}>
        <div className="pb-12">
          <h2 className="text-base font-semibold leading-7 text-base-content">
            Profile
          </h2>
          <p className="mt-1 text-sm leading-6 text-base-neutral">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-6 md:w-[50%]">
              <label htmlFor="username" className="label">
                <span className="label-text">Username</span>
              </label>
              <div className="mt-2">
                <div className="flex input input-bordered shadow-sm sm:max-w-md">
                  <span className="hidden sm:flex select-none items-center pl-3 text-base-content sm:text-sm">
                    devocode.vercel.app/
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-base-content placeholder:text-base-neutral focus:ring-0 sm:text-sm sm:leading-6"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="about" className="label">
                <span className="label-text">About</span>
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="textarea textarea-bordered block w-full h-28 bg-base-100 py-1.5 text-base-content shadow-sm placeholder:text-neutral focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                  onChange={formik.handleChange}
                  value={formik.values.about}
                />
              </div>
              <div className="label">
                <span className="label-text-alt">
                  Write a few sentences about yourself.
                </span>
              </div>
            </div>

            <div className="col-span-full hidden">
              <label htmlFor="photo" className="label">
                <span className="label-text">Photo</span>
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <div className="avatar placeholder mr-4">
                  <div className="bg-neutral text-neutral-content rounded-full w-12">
                    <span>AK</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="rounded-md bg-content px-2.5 py-1.5 text-sm font-semibold text-base-content shadow-sm ring-1 ring-inset ring-base-content hover:bg-neutral"
                >
                  Change
                </button>
              </div>
            </div>

            <div className="col-span-full hidden">
              <label htmlFor="cover-photo" className="label">
                <span className="label-text">Cover Photo</span>
              </label>
              <div className="mt-2 flex justify-center border border-dashed border-base-content px-6 py-10 rounded-lg">
                <div className="text-center">
                  {/* photo icon */}

                  <div className="mt-4 flex text-sm leading-6 text-base-neutral">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-base-neutral">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className="pb-12">
            <h2 className="text-base font-semibold leading-7 text-base-content">
              Personal Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-base-neutral">
              Use a permanent address where you can receive mail.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="name" className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="given-name"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="email" className="label">
                  <span className="label-text">Email address</span>
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    disabled
                  />
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="phone" className="label">
                  <span className="label-text">Phone</span>
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="phone"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    disabled
                  />
                </div>
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-3">
                <label htmlFor="address" className="label">
                  <span className="label-text">Address</span>
                </label>
                <div className="mt-2">
                  <input
                    id="address"
                    name="address"
                    type="address"
                    autoComplete="address"
                    className="input input-bordered w-full"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pb-12 hidden">
            <h2 className="text-base font-semibold leading-7 text-base-content">
              Notifications
            </h2>
            <p className="mt-1 text-sm leading-6 text-base-neutral">
              We'll always let you know about important changes, but you pick
              what else you want to hear about.
            </p>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-base-content">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        type="checkbox"
                        id="updates"
                        name="updates"
                        className="checkbox"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="updates"
                        className="font-medium text-base-content"
                      >
                        Updates
                      </label>
                      <p className="text-base-neutral">
                        Get notified when we make there are new features or
                        change in features.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        type="checkbox"
                        id="announcements"
                        name="announcements"
                        className="checkbox"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="announcements"
                        className="font-medium text-base-content"
                      >
                        Announcements and DL's
                      </label>
                      <p className="text-base-content">
                        Get notified when a new announcement or DL is posted.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        type="checkbox"
                        id="offers"
                        name="offers"
                        className="checkbox"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-base-content"
                      >
                        Offers
                      </label>
                      <p className="text-base-content">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-base-content">
                  Push Notifications
                </legend>
                <p className="mt-1 text-sm leading-6 text-base-neutral">
                  These are delivered via SMS to your mobile phone.
                </p>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-everything"
                      type="radio"
                      name="push-notifications"
                      className="radio"
                    />

                    <label
                      htmlFor="push-everything"
                      className="block text-sm font-medium leading-6 text-base-content"
                    >
                      Everything
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-email"
                      type="radio"
                      name="push-notifications"
                      className="radio"
                    />
                    <label
                      htmlFor="push-email"
                      className="block text-sm font-medium leading-6 text-base-content"
                    >
                      Same as email
                    </label>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      id="push-nothing"
                      type="radio"
                      name="push-notifications"
                      className="radio"
                    />
                    <label
                      htmlFor="push-nothing"
                      className="block text-sm font-medium leading-6 text-base-content"
                    >
                      No push notifications
                    </label>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div className="divider"></div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-2">
          <button type="button" className="btn btn-error btn-outline btn-sm">
            <label htmlFor="delete_modal">Delete Account</label>
          </button>
          <div className="flex gap-2">
            <button type="button" className="btn btn-ghost btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Save
            </button>
          </div>
        </div>
        <input type="checkbox" id="delete_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box max-w-96">
            <label htmlFor="city" className="label">
              <span className="label-text">
                Enter <b>{formik.values.username}</b> to delete
              </span>
            </label>
            <input
              type="text"
              id="delete_confirmation"
              name="confirmusername"
              className="input input-bordered w-full placeholder:text-base-content/40"
              placeholder={formik.values.username}
              disabled={isDeleting}
              onChange={formik.handleChange}
              value={formik.values.confirmusername}
            />
            <div className="flex modal-action">
              <button
                className="btn btn-primary flex-1"
                disabled={
                  formik.values.confirmusername !== formik.values.username ||
                  isDeleting
                }
                onClick={handleDelete}
              >
                {isDeleting ? (
                  <span className="loading loading-dots loading-sm"></span>
                ) : (
                  "Delete"
                )}
              </button>
              <label className="btn flex-1" htmlFor="delete_modal">
                Cancel
              </label>
            </div>
          </div>

          <label className="modal-backdrop" htmlFor="delete_modal">
            Close
          </label>
        </div>
      </form>
    </div>
  );
};

export default Profile;
