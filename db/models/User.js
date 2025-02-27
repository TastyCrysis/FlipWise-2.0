import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  userIdProvider: { type: String, required: true },
  themeMode: { type: String, default: "dark" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
