import { Readable } from "stream";
import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
  region: process.env.NEXT_PUBLIC_REGION,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).end(); // Method Not Allowed
  }

  const filename = req.query.filename;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME,
    Key: filename,
  };

  try {
    const { Body } = await s3.getObject(params).promise();

    const stream = Readable.from(Body);
    stream.pipe(res);
  } catch (error) {
    console.error("Error fetching file from S3:", error);
    res.status(404).send("File not found");
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
