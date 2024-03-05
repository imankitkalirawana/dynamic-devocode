import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/utils/db";
import verifyAdmin from "@/middleware/verifyAdmin";
connectDB();

export default async function handler(req, res) {
  verifyAdmin(req, res, async () => {
    if (req.method === "GET") {
      try {
        const userId = req.query.userId;
        if (userId === "all") {
          const users = await User.find().select("-password");
          res.json(users);
          return;
        }
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
        const userId = req.query.userId;
        if (userId === "register") {
          const { name, username, email, phone, password } = req.body;
          if (!name || !username || !email || !phone || !password) {
            return res.status(400).json({ error: "All fields are required" });
          }
          const userExists = await User.findOne({ username });
          const emailExists = await User.findOne({ email });
          if (userExists) {
            return res.status(400).json({ error: "Username already exists" });
          }
          if (emailExists) {
            return res.status(400).json({ error: "Email already exists" });
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const user = await User.create({
            name,
            username,
            email,
            phone,
            password: hashedPassword,
          });
          res.status(201).json(user);
        } else {
          const { newPassword } = req.body;
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ error: "User not found" });
          }
          const hashedPassword = await bcrypt.hash(newPassword, 10);
          user.password = hashedPassword;
          await user.save();
          res.json({ message: "Password updated successfully" });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    } else if (req.method === "PUT") {
      try {
        const userId = req.query.userId;
        const { name, username, email, phone } = req.body;
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        user.name = name;
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
        const userId = req.query.userId;
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
      }
    }
  });
}
