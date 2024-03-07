import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: String,
  description: String,
  file: String,
  type: {
    type: String,
    required: true,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  filesize: {
    type: String,
    default: "0",
  },
  addedDate: {
    type: Date,
    default: new Date(),
  },

  updatedAt: {
    type: Date,
    default: new Date(),
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subjects",
  },
});

const Resource =
  mongoose.models.Resource || mongoose.model("Resource", resourceSchema);

export default Resource;
