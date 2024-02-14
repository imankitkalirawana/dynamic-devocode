import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  profile: String,
  cover: String,
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: String,
  pan: String,
  aadhar: String,
  phone: {
    type: String,
    unique: true,
  },
  about: String,
  role: {
    type: String,
    default: "user",
  },
  country: String,
  state: String,
  city: String,
  streetaddress: String,
  zip: String,
  createdat: {
    type: Date,
    default: Date.now,
  },
  theme: {
    type: String,
    default: "default",
  },
  updatedat: Date,
});

let User;

try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", userSchema);
}
export default User;
