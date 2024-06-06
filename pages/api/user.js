import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/utils/db";
import verifyMember from "@/middleware/verifyMember";
import logger from "@/utils/logger";
connectDB();

const getUsername = async (userId) => {
  const user = await User.findById(userId);
  return user.username.toString();
};

export default async function handler(req, res) {
  const device = req.headers["user-agent"];
  const ip = req.headers["x-real-ip"];
  verifyMember(req, res, async () => {
    if (req.method === "GET") {
      try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password");
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    } else if (req.method === "POST") {
      try {
        const userId = req.userId;
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
          return res.status(400).json({ error: "Invalid password" });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        logger.log(
          "info",
          `type: "User"; action: "post"; code: "PASSWORD_CHANGED"; status: "success"; details: ${user}; by: ${await getUsername(
            userId
          )}; IP: ${ip}; device: ${device};`
        );
        res.json({ message: "Password updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    } else if (req.method === "PUT") {
      try {
        const userId = req.userId;
        const { name, username, about, email, phone, address } = req.body;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        user.name = name;
        user.username = username;
        user.email = email;
        user.about = about;
        user.phone = phone;
        user.address = address;

        await user.save();
        logger.log(
          "info",
          `type: "User"; action: "put"; code: "PROFILE_UPDATED"; status: "success"; details: ${user}; by: ${await getUsername(
            userId
          )}; IP: ${ip}; device: ${device};`
        );
        res.json({ message: "Profile updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    } else if (req.method === "DELETE") {
      try {
        const userId = req.userId;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        logger.log(
          "info",
          `type: "User"; action: "delete"; code: "USER_DELETED"; status: "success"; details: ${user}; by: ${await getUsername(
            userId
          )}; IP: ${ip}; device: ${device};`
        );
        res.json({ message: "User deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  });
}
