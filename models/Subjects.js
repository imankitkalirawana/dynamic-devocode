// subjectModel.js

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
    default: Date.now(),
  },
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  updatedDate: {
    type: Date,
    default: Date.now(),
  },
});

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default Subject;
