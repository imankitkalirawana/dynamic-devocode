import Resources from "@/models/Resources";
import Subject from "@/models/Subjects";
import { connectDB } from "@/utils/db";
import verifyMember from "@/middleware/verifyMember";
import cors from "@/cors";
connectDB();

// get subject id from subject code
const getSubjectId = async (subjectCode) => {
  const subject = await Subject.findOne({ code: subjectCode });
  // console.log(subject._id); // new ObjectId('658432ea49c9a5525725905d')
  return subject._id.toString();
};

export default cors(async (req, res) => {
  if (req.method === "GET") {
    try {
      const { subjectCode, type } = req.query;
      if (subjectCode) {
        const subjectId = await getSubjectId(subjectCode);
        if (!type) {
          const resources = await Resources.find({ subject: subjectId });
          resources.sort((a, b) => a.type.localeCompare(b.type));
          res.status(200).json(resources);
          return;
        }
        const resources = await Resources.find({
          subject: subjectId,
          type: type,
        });
        res.status(200).json(resources);
      } else {
        const resources = await Resources.find({ type: type });
        // sort
        res.status(200).json(resources);
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } else {
    verifyMember(req, res, async () => {
      if (req.method === "POST") {
        try {
          const { subjectCode } = req.query;
          let { type, title, link, description, file } = req.body;
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
            file,
            by: userId,
          });
          await resource.save();
          res.status(201).json({ message: "Resource added successfully" });
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      } else if (req.method === "PUT") {
        try {
          // only update what user created
          const userId = req.userId;
          const { resourceId } = req.query;
          const resource = await Resources.findOne({
            _id: resourceId,
            by: userId,
          });
          if (!resource) {
            res.status(404).json({ message: "Resource not found" });
            return;
          }
          let { type, title, link, description } = req.body;
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
          const updatedResource = await Resources.findByIdAndUpdate(
            resourceId,
            { type, title, link, description, updatedAt: Date.now() },
            { new: true }
          );
          res.status(200).json(updatedResource);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      } else if (req.method === "DELETE") {
        try {
          const userId = req.userId;
          const { resourceId } = req.query;
          const resource = await Resources.findOne({
            _id: resourceId,
            by: userId,
          });
          if (!resource) {
            res.status(404).json({ message: "Resource not found" });
            return;
          }
          await Resources.findByIdAndDelete(resourceId);
          res.status(200).json({ message: "Resource deleted successfully" });
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      } else {
        res.status(405).json({ message: "Method not allowed" });
      }
    });
  }
});
