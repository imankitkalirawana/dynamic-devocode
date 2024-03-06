import { timeStamp } from "console";
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
    default: Date.now(),
  },
});

const Logs = mongoose.models.Logs || mongoose.model("Logs", logSchema);

export default Logs;
