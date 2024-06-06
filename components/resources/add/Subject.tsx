"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type SubjectProps = {
  lastItem: any;
};

interface Subject {
  code: string;
  title: string;
  description: string;
  _id: string;
}

const Subject: React.FC<SubjectProps> = ({ lastItem }) => {
  const router = useRouter();
  const [subject, setSubject] = useState<Subject>({
    code: "",
    title: "",
    description: "",
    _id: "",
  });
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSubject((prevSubject) => ({
      ...prevSubject,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await toast.promise(
        axios.post("/api/resources/subjects", subject, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }),
        {
          loading: "Adding...",
          success: "Added",
          error: "Error",
        }
      );
      setSubject({} as Subject);
      //   close the popup
      const modal = document.getElementById("add_subject");
      modal?.click();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form className="modal-box max-w-96" onSubmit={handleSubmit}>
        <h2 className="text-lg text-center font-semibold">
          Add to {lastItem.label}
        </h2>
        <div className="mx-auto flex flex-col mb-8 overflow-y-scroll px-4 py-2 gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="code" className="label">
              <span className="label-text">Code</span>
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={subject.code}
              className="input input-bordered w-full"
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={subject.title}
              className="input input-bordered w-full"
              onChange={handleInput}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="description" className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={subject.description}
              className="textarea textarea-bordered w-full"
              onChange={handleInput}
            ></textarea>
          </div>
        </div>
        <div className="flex modal-action">
          <button className="btn btn-primary flex-1" type="submit">
            Add
          </button>
          <label className="btn flex-1" htmlFor="add_subject">
            Cancel
          </label>
        </div>
      </form>
    </>
  );
};

export default Subject;
