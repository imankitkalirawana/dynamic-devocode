import Resources from "@/models/Resources";
import Subject from "@/models/Subjects";
import { connectDB } from "@/utils/db";
import verifyMember from "@/middleware/verifyMember";
import cors from "@/cors";
import logger from "@/utils/logger";
connectDB();

// get subject id from subject code
const getSubjectId = async (subjectCode) => {
  const subject = await Subject.findOne({ code: subjectCode });
  // console.log(subject._id); // new ObjectId('658432ea49c9a5525725905d')
  return subject._id.toString();
};

export default cors(async (req, res) => {
  // get device details and ip address
  const device = req.headers["user-agent"];
  const ip = req.headers["x-real-ip"];
  if (req.method === "GET") {
    try {
      const { subjectCode, type, resourceId } = req.query;
      if (resourceId) {
        const resource = await Resources.findById(resourceId);
        if (!resource) {
          res.status(404).json({ message: "Resource not found" });
          return;
        }
        res.status(200).json(resource);
        return;
      }
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
          if (!subjectCode) {
            res.status(400).json({ message: "Subject code is required" });
            return;
          }
          let { resourceType, title, link, description, file, filesize } =
            req.body;
          console.log("link", link);
          const subjectId = await getSubjectId(subjectCode);
          const userId = req.userId;
          if (!resourceType || !title) {
            res.status(401).json({
              message: "Type and Title are required",
            });
            return;
          }
          resourceType = resourceType.toLowerCase();
          if (resourceType === "link" && !link) {
            res.status(402).json({
              message: "Link is required for type link",
            });
            return;
          }

          const resource = await Resources.create({
            subject: subjectId,
            type: resourceType,
            title,
            link,
            description,
            file,
            filesize,
            isArchived: false,
            by: userId,
          });

          logger.log(
            "info",
            `Resource: ${title}: ${description} (${resourceType}) created by user: ${userId} from ${ip} using ${device}`
          );

          res.status(201).json(resource);
        } catch (e) {
          logger.log(
            "error",
            `Error creating resource: ${e.message} by user: ${req.userId} from ${ip} using ${device}`
          );
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
            logger.log(
              "error",
              `User: ${userId} tried to update resource: ${resourceId} which does not exist or is not created by the user from ${ip} using ${device}`
            );
            res
              .status(404)
              .json({ message: "You can update only what you have created!" });
            return;
          }

          let { type, title, link, description, isArchived, file } = req.body;
          if (!type || !title) {
            res.status(400).json({
              message: "Type and Title are required",
            });
            return;
          }
          type = type.toLowerCase();
          console.log(isArchived); // it is returning true
          const updatedResource = await Resources.findByIdAndUpdate(
            resourceId,
            {
              type,
              title,
              link,
              description,
              isArchived,
              updatedAt: Date.now(),
              file,
            },
            { new: true }
          );
          logger.log(
            "info",
            `Resource: ${title}: ${description} (${type}) updated by user: ${userId} from ${ip} using ${device}`
          );
          res.status(200).json(updatedResource);
        } catch (e) {
          logger.log(
            "error",
            `Error updating resource: ${e.message} by user: ${req.userId} from ${ip} using ${device}`
          );
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
            logger.log(
              "error",
              `User: ${userId} tried to delete resource: ${resourceId} which does not exist or is not created by the user from ${ip} using ${device}`
            );
            res
              .status(404)
              .json({ message: "You can only delete what you have created!" });
            return;
          }
          await Resources.findByIdAndDelete(resourceId);
          logger.log(
            "info",
            `Resource:{\n\taction: "delete"\n${resource}\n\t by: "${userId}"\n\tIP: "${ip}"\n\tdevice: "${device}"\n}`
          );
          res.status(200).json({ message: "Resource deleted successfully" });
        } catch (e) {
          logger.log(
            "error",
            `Error deleting resource: ${e.message} by user: ${req.userId} from ${ip} using ${device}`
          );
          res.status(400).json({ message: e.message });
        }
      } else {
        logger.log(
          "error",
          `User: ${req.userId} tried to access resource API with ${req.method} method from ${ip} using ${device}`
        );
        res.status(405).json({ message: "Method not allowed" });
      }
    });
  }
});
