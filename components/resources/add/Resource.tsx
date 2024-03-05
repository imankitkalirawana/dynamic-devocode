import React, { useState } from "react";
import resourceTypes from "@/utils/resourceTypes";
import { useFormik } from "formik";
import axios from "axios";
import S3 from "aws-sdk/clients/s3";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import Jimp from "jimp";

const s3 = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
});

type ResourceProps = {
  lastItem: any;
};

interface Resource {
  title: string;
  description: string;
  resourceType: string;
  url: string;
  file: File | null;
  filesize: string;
}

const Resource: React.FC<ResourceProps> = ({ lastItem }) => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [upload, setUpload] = useState<S3.ManagedUpload | null>(null);
  const [progress, setProgress] = useState<number>(0);

  // get subject code from the url
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      resourceType: "others",
      link: "",
      file: null,
      filesize: "",
      watermark: false,
    },
    onSubmit: async (values) => {
      addData(values);
      if (file) {
        handleUpload();
      } else {
        const modal = document.getElementById("add_subject");
        modal?.click();
        router.refresh();
      }
    },
  });

  const addData = async (values: any) => {
    try {
      const res = await toast.promise(
        axios.post(
          `/api/resources/resources/?subjectCode=${lastItem.label}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          loading: "Adding...",
          success: "Added",
          error: "Error",
        }
      );
      if (res.status != 201) {
        console.log("error occured");
        return;
      }
      // handleUpload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files![0];
    if (selectedFile) {
      const fileSize = selectedFile.size / 1024 / 1024;
      var file = e.target.files![0];
      var extension = file.name.split(".").pop();
      var resourceTitle = formik.values.title;
      var resourceType = formik.values.resourceType;
      if (resourceTitle === "") resourceTitle = "untitled";
      if (resourceType === "") resourceType = "others";
      resourceTitle = resourceTitle.replace(/\s/g, "_");
      file = new File(
        [file],
        `${
          lastItem.label
        }_${resourceType}_${resourceTitle}_${Date.now()}.${extension}`,
        {
          type: file.type,
        }
      );
      setFile(file);
      formik.setFieldValue("file", file.name);
      formik.setFieldValue("filesize", fileSize.toFixed(2));
    } else {
      // If no file is selected, reset the file state and formik field
      setFile(null);
      formik.setFieldValue("file", null);
    }
  };

  const handleResourceType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("resourceType", e.target.value);
    // reset the file value and url value
    formik.setFieldValue("file", null);
    formik.setFieldValue("link", "");
  };

  console.log(formik.values);

  const handleUpload = async () => {
    if (file) {
      const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME!,
        Key: file.name,
        Body: file,
      };

      try {
        if (formik.values.watermark === true) {
          if (file.type === "application/pdf") {
            // Watermark for PDF files
            const watermarkText = "www.devocode.in";
            const existingPdfBytes = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(existingPdfBytes);
            const pages = pdfDoc.getPages();

            for (let i = 0; i < pages.length; i++) {
              const page = pages[i];
              const { width, height } = page.getSize();
              const fontSize = 16;

              const x = width - 150;
              const y = height - 30;

              page.drawText(watermarkText, {
                x: x,
                y: y,
                size: fontSize,
                color: rgb(0, 0, 0),
                opacity: 0.7,
              });
            }

            const modifiedPdfBytes = await pdfDoc.save();
            const modifiedPdfFile = new File([modifiedPdfBytes], file.name);
            params.Body = modifiedPdfFile;
          } else if (file.type === "image/jpeg" || file.type === "image/jpg") {
            const watermarkText = "devocode.in";
            const image = await Jimp.read(file);
            const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
            image.print(font, 10, 10, watermarkText);

            const modifiedImageBuffer = await image.getBufferAsync(
              Jimp.MIME_JPEG
            );
            const modifiedImageFile = new File(
              [modifiedImageBuffer],
              file.name
            );
            params.Body = modifiedImageFile;
          }
        }

        const upload = s3.upload(params);
        setUpload(upload);
        upload.on("httpUploadProgress", (p: any) => {
          setProgress((p.loaded / p.total) * 100);
        });
        const res = await toast.promise(upload.promise(), {
          loading: "Uploading...",
          success: "Uploaded",
          error: "Error",
        });
        formik.resetForm();
        // close the popup
        const modal = document.getElementById("add_subject");
        modal?.click();
        router.refresh();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const resourceType = resourceTypes.filter((type) => type != "all");
  return (
    <>
      <form className="modal-box max-w-96" onSubmit={formik.handleSubmit}>
        <h2 className="text-lg text-center font-semibold">
          Add to {lastItem.label}
        </h2>
        <div className="mx-auto flex flex-col mb-8 overflow-y-scroll px-4 py-2 gap-2">
          <div className="flex flex-col w-full">
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input input-bordered w-full"
              value={formik.values.title}
              onChange={formik.handleChange}
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
              className="textarea textarea-bordered w-full"
              value={formik.values.description}
              onChange={formik.handleChange}
            ></textarea>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="resource_type" className="label">
              <span className="label-text">Resource Type</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              id="resourceType"
              name="resourceType"
              onChange={handleResourceType}
              value={formik.values.resourceType}
            >
              {resourceType.map((type, index) => (
                <option key={index} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
          {/* elements added based on user selection */}
          {formik.values.resourceType === "link" ||
          formik.values.resourceType === "moocs" ? (
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
            <>
              <div className="flex flex-col w-full">
                <label htmlFor="filesize" className="label">
                  <span className="label-text">Add watermark</span>
                </label>
                <input
                  type="checkbox"
                  id="watermark"
                  name="watermark"
                  className="toggle"
                  onChange={formik.handleChange}
                  checked={formik.values.watermark}
                />
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="file" className="label">
                  <span className="label-text">File</span>
                </label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="file-input file-input-bordered w-full"
                  onChange={handleFile}
                  required
                />
              </div>
              {progress > 0 && (
                <progress
                  className="progress w-full animate-enter"
                  value={progress}
                  max="100"
                ></progress>
              )}
            </>
          )}
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

export default Resource;
