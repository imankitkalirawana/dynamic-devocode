import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
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
      default: Date.now(),
    },

    updatedAt: {
      type: Date,
      default: Date.now(),
    },
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subjects",
    },
  },
  {
    timestamps: true,
  }
);

const Resource =
  mongoose.models.Resource || mongoose.model("Resource", resourceSchema);

export default Resource;
