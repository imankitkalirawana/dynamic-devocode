import { connectDB } from "@/utils/db";
import Logs from "@/models/Logs";
import verifyAdmin from "@/middleware/verifyAdmin";
import cors from "@/cors";
connectDB();

export default cors(async (req, res) => {
  verifyAdmin(req, res, async () => {
    if (req.method === "GET") {
      const logs = await Logs.find();
      res.status(200).json(logs);
    }
  });
});
