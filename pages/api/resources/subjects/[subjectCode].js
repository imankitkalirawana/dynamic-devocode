import Subject from "@/models/Subjects";
import { connectDB } from "@/utils/db";
import verifyMember from "@/middleware/verifyMember";
import cors from "@/cors";
connectDB();

export default cors(async (req, res) => {
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
            res.status(404).json({ message: "Subject not found" });
            return;
          }
          let { code, title, description } = req.body;
          if (!code || !title || !description) {
            res.status(400).json({
              message: "Code, title, and description are required",
            });
            return;
          }
          code = code.toUpperCase();
          const updatedSubject = await Subject.findOneAndUpdate(
            { code: subjectCode, by: userId },
            { code, title, description },
            { new: true }
          );
          res.status(200).json(updatedSubject);
        } catch (e) {
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
            res.status(404).json({ message: "Subject not found" });
            return;
          }
          await Subject.findOneAndDelete({ code: subjectCode, by: userId });
          res.status(200).json({ message: "Subject deleted" });
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      } else {
        res.status(405).json({ message: "Method not allowed" });
      }
    });
  }
});
