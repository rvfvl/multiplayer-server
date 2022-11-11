import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: "string", required: true },
  location: { type: "string", required: true },
});

const User = new mongoose.Model("User", userSchema);

export default User;
