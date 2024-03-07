import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  meta: {
    type: Object,
  },
  timeStamp: {
    type: Date,
    default: () =>
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
  },
});

const Logs = mongoose.models.Logs || mongoose.model("Logs", logSchema);

export default Logs;
