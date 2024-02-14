import Subject from "@/models/Subjects";
import { connectDB } from "@/utils/db";
import verifyMember from "@/middleware/verifyMember";
import cors from "@/cors";
connectDB();

export default cors(async (req, res) => {
  if (req.method === "GET") {
    const subjects = await Subject.find();
    res.status(200).json(subjects);
  } else {
    verifyMember(req, res, async () => {
      if (req.method === "POST") {
        try {
          let { code, title, description } = req.body;
          const userId = req.userId;
          if (!code || !title || !description) {
            res.status(400).json({
              message: "Code, title, and description are required",
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
          res.status(201).json(subject);
        } catch (e) {
          res.status(400).json({ message: e.message });
        }
      } else {
        res.status(405).json({ message: "Method not allowed" });
      }
    });
  }
  //
});
