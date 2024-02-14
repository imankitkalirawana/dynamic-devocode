import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/utils/db";
import verifyMember from "@/middleware/verifyMember";
connectDB();

export default async function handler(req, res) {
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
        res.json({ message: "Password updated successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    } else if (req.method === "PUT") {
      try {
        const userId = req.userId;
        const { firstname, lastname, username, email, phone } = req.body;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        user.firstname = firstname;
        user.lastname = lastname;
        user.username = username;
        user.email = email;
        user.phone = phone;

        await user.save();
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
