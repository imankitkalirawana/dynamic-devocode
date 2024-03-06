import Subject from "@/models/Subjects";
import { connectDB } from "@/utils/db";
import verifyMember from "@/middleware/verifyMember";
import cors from "@/cors";
import logger from "@/utils/logger";
connectDB();

export default cors(async (req, res) => {
  if (req.method === "GET") {
    const subjects = await Subject.find();
    // sort by code alphabetically
    subjects.sort((a, b) => a.code.localeCompare(b.code));
    res.status(200).json(subjects);
  } else {
    verifyMember(req, res, async () => {
      if (req.method === "POST") {
        try {
          let { code, title, description } = req.body;
          const userId = req.userId;
          if (!code || !title) {
            res.status(401).json({
              message: "Code and title are required",
            });
            return;
          }
          // check if the code already exists
          const existingSubject = await Subject.findOne({
            code: code.toUpperCase(),
          });
          if (existingSubject) {
            res.status(402).json({
              message: "Subject with the same code already exists",
            });
            return;
          }
          code = code.toUpperCase();

          const subject = await Subject.create({
            code,
            title,
            description,
            by: userId,
          });

          logger.log(
            `User: ${userId} created subject: ${code} from ${req.headers["x-real-ip"]} using ${req.headers["user-agent"]}`
          );
          res.status(201).json(subject);
        } catch (e) {
          logger.error(
            `Error creating subject: ${e.message} from ${req.headers["x-real-ip"]} using ${req.headers["user-agent"]}`
          );
          res.status(400).json({ message: e.message });
        }
      } else {
        logger.error(
          `User: ${req.userId} tried to access a route /api/resources/subjects/${req.method} from ${req.headers["x-real-ip"]} using ${req.headers["user-agent"]}`
        );
        res.status(405).json({ message: "Method not allowed" });
      }
    });
  }
  //
});
