import React, { useState } from "react";
import resourceTypes from "@/utils/resourceTypes";
import { useFormik } from "formik";
import axios from "axios";
import S3 from "aws-sdk/clients/s3";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PDFDocument, rgb } from "pdf-lib";
import Jimp from "jimp";
import {
  Button,
  Input,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Progress,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from "@nextui-org/react";

const s3 = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
});

type ResourceProps = {
  lastItem: any;
  onclose: () => void;
};

interface Resource {
  title: string;
  description: string;
  resourceType: string;
  url: string;
  file: File | null;
  filesize: string;
}

const Resource: React.FC<ResourceProps> = ({ lastItem, onclose }) => {
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
      isURL: false,
    },
    onSubmit: async (values) => {
      try {
        if (file) {
          await handleUpload();
        }
        await addData(values);
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      }
    },
  });

  const addData = async (values: any) => {
    try {
      await axios
        .post(
          `/api/resources/resources/?subjectCode=${lastItem.label}`,
          values,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(() => {
          toast.success("Resource added successfully");
          onclose();
          router.refresh();
        });

      // handleUpload();
    } catch (error) {
      toast.error("An error occurred");
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

            // Read file content as buffer
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            // Read buffer using Jimp
            const image = await Jimp.read(buffer);

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
        upload.promise();
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      }
    }
  };

  const resourceType = resourceTypes.filter((type) => type != "all");
  return (
    <>
      <ModalHeader>Add to {lastItem.label}</ModalHeader>
      <ModalBody>
        <Input
          autoFocus
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          name="title"
          id="title"
          required
        />
        <Textarea
          label="Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          name="description"
          id="description"
        />
        <Select
          label="Resource Type"
          value={formik.values.resourceType}
          onChange={formik.handleChange}
          name="resourceType"
          id="resourceType"
          required
        >
          {resourceType.map((type, index) => (
            <SelectItem className="capitalize" key={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </SelectItem>
          ))}
        </Select>
        <p className="text-small text-default-500">
          {formik.values.isURL ? "Type: URL" : "Type: File"}
        </p>
        <Switch
          isSelected={formik.values.isURL}
          name="isURL"
          id="isURL"
          onValueChange={
            formik.values.isURL
              ? () => formik.setFieldValue("isURL", false)
              : () => formik.setFieldValue("isURL", true)
          }
        >
          File/URL
        </Switch>

        {formik.values.isURL ? (
          <Input
            label="URL"
            value={formik.values.link}
            onChange={formik.handleChange}
            name="link"
            id="link"
            required
          />
        ) : (
          <>
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
              <Progress
                aria-label="Downloading..."
                value={progress}
                color="success"
                showValueLabel={true}
              />
            )}

            <Switch
              isSelected={formik.values.watermark}
              name="watermark"
              id="watermark"
              onValueChange={
                formik.values.watermark
                  ? () => formik.setFieldValue("watermark", false)
                  : () => formik.setFieldValue("watermark", true)
              }
            >
              Watermark on file
            </Switch>
          </>
        )}
      </ModalBody>
      <ModalFooter className="flex-col sm:flex-row">
        <Button
          variant="flat"
          onClick={() => {
            onclose();
          }}
          fullWidth
          isDisabled={(progress > 0 && progress < 100) || formik.isSubmitting}
        >
          Cancel
        </Button>
        <Button
          isLoading={formik.isSubmitting}
          onClick={() => formik.handleSubmit()}
          color="primary"
          variant="flat"
          type="submit"
          fullWidth
          isDisabled={(progress > 0 && progress < 100) || formik.isSubmitting}
        >
          Add
        </Button>
      </ModalFooter>
    </>
  );
};

export default Resource;
