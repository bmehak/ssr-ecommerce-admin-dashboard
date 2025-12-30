import mongoose from "mongoose";
import { required } from "zod/mini";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: true,
  }
});

export const User =
  mongoose.models.User || mongoose.model("User", UserSchema);
