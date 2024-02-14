import Resources from "@/models/Resources";
import Subject from "@/models/Subjects";
import { connectDB } from "@/utils/db";
import verifyMember from "@/middleware/verifyMember";
import cors from "@/cors";
connectDB();

// get subject id from subject code
const getSubjectId = async (subjectCode) => {
  const subject = await Subject.findOne({ code: subjectCode });
  return subject._id;
};

export default cors(async (req, res) => {
  if (req.method === "GET") {
    try {
      const { subjectCode, type } = req.query;
      if (subjectCode && type) {
        const subjectId = await getSubjectId(subjectCode);
        if (!type) {
          const resources = await Resources.find({ subject: subjectId });
          res.status(200).json(resources);
        }
        const resources = await Resources.find({
          subject: subjectId,
          type: type,
        });
        res.status(200).json(resources);
      } else {
        const resources = await Resources.find({ type: type });
        res.status(200).json(resources);
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } else if (req.method === "POST") {
    verifyMember(req, res, async () => {
      try {
        const { subjectCode } = req.query;
        let { type, title, link, description } = req.body;
        const subjectId = await getSubjectId(subjectCode);
        const userId = req.userId;
        if (!type || !title) {
          res.status(400).json({
            message: "Type and Title are required",
          });
          return;
        }
        type = type.toLowerCase();
        if (type === "link" && !link) {
          res.status(400).json({
            message: "Link is required for type link",
          });
          return;
        }
        const resource = new Resources({
          subject: subjectId,
          type,
          title,
          link,
          description,
          by: userId,
        });
        await resource.save();
        res.status(201).json({ message: "Resource added successfully" });
      } catch (e) {
        res.status(400).json({ message: e.message });
      }
    });
  }
});
