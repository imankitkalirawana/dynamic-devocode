import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/utils/db";
import { JWT_SECRET_KEY } from "@/utils/keys";
import logger from "@/utils/logger";
connectDB();
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // get device details and ip address
      const device = req.headers["user-agent"];
      const ip = req.headers["x-real-ip"];
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ error: "Invalid username" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        logger.log(
          "error",
          `Invalid Password for user: ${username} from ${ip} using ${device}`
        );
        return res.status(402).json({ error: "Invalid Password" });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username,
          role: user.role,
        },
        JWT_SECRET_KEY,
        { expiresIn: "30d" }
      );

      logger.log(
        "info",
        `User: ${username} logged in from ${ip} using ${device}`
      );

      res.json({
        userId: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token,
      });
    } catch (error) {
      logger.error("Error authenticating user:", error);
      console.error("Error authenticating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    logger.log("error", "Login Method Not Allowed");
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
