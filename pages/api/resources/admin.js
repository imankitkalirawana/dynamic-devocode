import Resources from "@/models/Resources";
import Subject from "@/models/Subjects";
import { connectDB } from "@/utils/db";
import verifyAdmin from "@/middleware/verifyAdmin";
import cors from "@/cors";
connectDB();

const getSubjectId = async (subjectCode) => {
  const subject = await Subject.findOne({ code: subjectCode });
  return subject._id.toString();
};

export default cors(async (req, res) => {
  if (req.method === "GET") {
  } else {
  }
});
