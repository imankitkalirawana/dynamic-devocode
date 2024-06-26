import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
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
  address: String,
  zip: String,
  createdat: {
    type: Date,
    default: new Date(),
  },
  theme: {
    type: String,
    default: "default",
  },
  updatedat: {
    type: Date,
    default: new Date(),
  },
});

let User;

try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", userSchema);
}
export default User;
