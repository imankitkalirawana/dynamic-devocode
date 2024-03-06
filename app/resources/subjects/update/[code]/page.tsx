"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/utils/auth";
import { usePathname } from "next/navigation";
import { toast } from "react-hot-toast";

interface Props {
  params: {
    code: string;
  };
}

interface Subject {
  _id: string;
  code: string;
  title: string;
  description: string;
  isArchived: boolean;
}

const Page = ({ params }: Props) => {
  const { loggedIn } = isLoggedIn();
  const [subject, setSubject] = useState<Subject>({} as Subject);
  const router = useRouter();
  const location = usePathname();

  useEffect(() => {
    const getSubject = async () => {
      const res = await axios.get(`/api/resources/subjects/${params.code}`);
      setSubject(res.data);
      formik.setValues({
        ...formik.values,
        code: res.data.code,
        title: res.data.title,
        description: res.data.description,
        isArchived: res.data.isArchived,
      });
    };
    if (!loggedIn) {
      router.push("/auth/login");
      // set route to localStorage
      localStorage.setItem("redirectPath", location || "");
    }
    getSubject();
  }, []);

  const formik = useFormik({
    initialValues: {
      code: subject.code,
      title: subject.title,
      description: subject.description,
      isArchived: subject.isArchived,
    },
    onSubmit: async (values) => {
      try {
        await axios
          .put(`/api/resources/subjects/${params.code}`, values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then(() => {
            toast.success("Subject updated");
            router.push("/resources/subjects");
          });
      } catch (error: any) {
        console.error(error);
        toast.error(error.response.data.message);
      }
    },
  });

  const handleDelete = async () => {
    try {
      const res = await axios.delete(`/api/resources/subjects/${params.code}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      toast.success(res.data.message);
      router.push("/resources/subjects");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="hero min-h-screen p-4">
        <div className="card shrink-0 w-full max-w-sm">
          <form className="card-body" onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Code</span>
              </label>
              <input
                type="text"
                id="code"
                name="code"
                className="input input-bordered"
                required
                value={formik.values.code}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="input input-bordered"
                required
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                id="description"
                name="description"
                className="textarea textarea-bordered"
                value={formik.values.description}
                onChange={formik.handleChange}
              ></textarea>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Archived</span>
              </label>
              <input
                type="checkbox"
                id="isArchived"
                name="isArchived"
                className="toggle"
                checked={formik.values.isArchived}
                onChange={formik.handleChange}
              />
              {formik.values.isArchived && (
                <label className="label">
                  <span className="label-text-alt">
                    The subject will not be visible to anyone
                  </span>
                </label>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                className="btn btn-error btn-outline btn-sm"
                type="button"
                onClick={handleDelete}
              >
                Delete
              </button>
              <div className="flex gap-2">
                <button
                  className="btn btn-sm"
                  type="button"
                  onClick={() => router.back()}
                >
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" type="submit">
                  Update
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
