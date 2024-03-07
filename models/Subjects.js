// subjectModel.js
import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  url: String,
  description: String,
  isArchived: {
    type: Boolean,
    default: false,
  },
  file: String,
  addedDate: {
    type: Date,
    default: () =>
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  updatedDate: {
    type: Date,
    default: () =>
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  },
});

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default Subject;
