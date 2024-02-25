"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import resourceTypes from "@/utils/resourceTypes";

interface Props {
  params: {
    code: string;
    resourceId: string;
  };
}

interface Resource {
  _id: string;
  title: string;
  description: string;
  link: string;
  isArchived: boolean;
  type: string;
  file: string;
}

const Page = ({ params }: Props) => {
  const [resource, setResource] = useState<Resource>({} as Resource);
  const router = useRouter();

  useEffect(() => {
    const getResource = async () => {
      const res = await axios.get(
        `/api/resources/resources/?resourceId=${params.resourceId}`
      );
      setResource(res.data);
      formik.setValues({
        ...formik.values,
        title: res.data.title,
        description: res.data.description,
        link: res.data.link,
        isArchived: res.data.isArchived,
        type: res.data.type,
        file: res.data.file,
      });
    };
    getResource();
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      link: "",
      isArchived: false,
      type: "",
      file: "",
    },
    onSubmit: async (values) => {
      try {
        await axios
          .put(
            `/api/resources/resources/?resourceId=${params.resourceId}`,
            values,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
          .then(() => {
            router.push(`/resources/subjects/${params.code}/all`);
          });
      } catch (error) {
        console.error(error);
      }
    },
  });

  const handleDelete = async () => {
    try {
      await axios.delete(
        `/api/resources/resources/?resourceId=${params.resourceId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      router.push(`/resources/subjects/${params.code}/all`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleResourceType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("type", e.target.value);
    // reset the file value and url value
    formik.setFieldValue("file", null);
    formik.setFieldValue("link", "");
  };
  const resourceType = resourceTypes.filter((type) => type != "all");

  return (
    <>
      <div className="hero min-h-screen p-4">
        <div className="card shrink-0 w-full max-w-sm">
          <form className="card-body" onSubmit={formik.handleSubmit}>
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
                <span className="label-text">Resource Type</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                id="type"
                name="type"
                onChange={handleResourceType}
                value={formik.values.type}
              >
                {resourceType.map((type, index) => (
                  <option key={index} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            {formik.values.type === "link" || formik.values.type === "moocs" ? (
              <div className="flex flex-col w-full">
                <label htmlFor="link" className="label">
                  <span className="label-text">Link</span>
                </label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  className="input input-bordered w-full"
                  value={formik.values.link}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            ) : (
              <div className="flex flex-col w-full">
                <label htmlFor="file" className="label">
                  <span className="label-text">File</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="file-input file-input-bordered w-full"
                  // onChange={handleFile}
                  required
                />
              </div>
            )}

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
                <button className="btn btn-sm" type="button">
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
