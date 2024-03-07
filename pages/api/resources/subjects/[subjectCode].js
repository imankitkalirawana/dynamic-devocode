import Subject from "@/models/Subjects";
import User from "@/models/User";
import { connectDB } from "@/utils/db";
import verifyMember from "@/middleware/verifyMember";
import cors from "@/cors";
import logger from "@/utils/logger";
connectDB();

const getUsername = async (userId) => {
  const user = await User.findById(userId);
  return user.username.toString();
};

export default cors(async (req, res) => {
  // get device details and ip address
  const device = req.headers["user-agent"];
  const ip = req.headers["x-real-ip"];
  if (req.method === "GET") {
    // get subject by code
    try {
      if (req.query.subjectCode === "all") {
        verifyMember(req, res, async () => {
          const subjects = await Subject.find({ by: req.userId });
          res.status(200).json(subjects);
        });
      } else {
        let subjectCode = req.query.subjectCode;
        subjectCode = subjectCode.toUpperCase();
        const subject = await Subject.findOne({ code: subjectCode });
        if (!subject) {
          res.status(404).json({ message: "Subject not found" });
          return;
        }
        res.status(200).json(subject);
      }
    } catch (e) {
      res.status(400).json({ message: e.message });
    }
  } else {
    verifyMember(req, res, async () => {
      if (req.method === "PUT") {
        try {
          // can only update what user created
          const userId = req.userId;
          const subjectCode = req.query.subjectCode;
          const subject = await Subject.findOne({
            code: subjectCode,
            by: userId,
          });
          if (!subject) {
            logger.log(
              "error",
              `type: "Subject"; action: "put"; code: "BAD_ACCESS"; status: "error"; details: ${subjectCode}; by: ${await getUsername(
                userId
              )}; IP: ${ip}; device: ${device};`
            );
            res
              .status(404)
              .json({ message: "You can only update what you have created" });
            return;
          }
          let { code, title, description, isArchived } = req.body;
          console.log("archived: ", isArchived);
          if (!code || !title) {
            res.status(400).json({
              message: "Code, title are required",
            });
            return;
          }
          code = code.toUpperCase();
          const updatedSubject = await Subject.findOneAndUpdate(
            { code: subjectCode, by: userId },
            { code, title, description, isArchived },
            { new: true }
          );
          logger.log(
            "info",
            `type: "Subject"; action: "put"; status: "success"; details: ${subject}; by: ${await getUsername(
              userId
            )}; IP: ${ip}; device: ${device};`
          );
          res.status(200).json(updatedSubject);
        } catch (e) {
          logger.error(
            `Error updating subject: ${e.message} by user: ${req.userId} from ${ip} using ${device}`
          );
          res.status(400).json({ message: e.message });
        }
      } else if (req.method === "DELETE") {
        try {
          const userId = req.userId;
          const subjectCode = req.query.subjectCode;
          const subject = await Subject.findOne({
            code: subjectCode,
            by: userId,
          });
          if (!subject) {
            logger.log(
              "error",
              `type: "Subject"; action: "delete"; code: "BAD_ACCESS"; status: "error"; details: ${subject}; by: ${await getUsername(
                userId
              )}; IP: ${ip}; device: ${device};`
            );
            res
              .status(404)
              .json({ message: "You can only delete what you created!" });
            return;
          }
          await Subject.findOneAndDelete({ code: subjectCode, by: userId });
          logger.log(
            "info",
            `type: "Subject"; action: "post"; status: "success"; details: ${subject}; by: ${await getUsername(
              userId
            )}; IP: ${ip}; device: ${device};`
          );
          res.status(200).json({ message: "Subject deleted" });
        } catch (e) {
          logger.log(
            "error",
            `type: "Subject"; action: "delete"; status: "error"; details: null; by: null; IP: ${ip}; device: ${device};`
          );
          res.status(400).json({ message: e.message });
        }
      } else {
        logger.log(
          "error",
          `User: ${req.userId} tried to access a route /api/resources/subjects/[subjectCode]/${req.method} from ${device} using ${ip}`
        );
        res.status(405).json({ message: "Method not allowed" });
      }
    });
  }
});
