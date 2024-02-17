import Resources from "@/models/Resources";
import Subject from "@/models/Subjects";
import { connectDB } from "@/utils/db";
import verifyMember from "@/middleware/verifyMember";
import cors from "@/cors";
connectDB();

// get subject and resource count
const getSubjectAndResourceCount = async () => {
  const subjects = await Subject.find();
  const resources = await Resources.find();
  return {
    subjectCount: subjects.length,
    resourceCount: resources.length,
  };
};

export default cors(async (req, res) => {
  if (req.method === "GET") {
    try {
      const count = await getSubjectAndResourceCount();
      res.status(200).json(count);
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } else {
    verifyMember(req, res, async () => {
      res.status(405).json({ message: "Method not allowed" });
    });
  }
});
