import mongoose from "mongoose";

export interface IUser {
  username: string;
  location: string;
  x: number;
  y: number;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: "string", required: true },
  location: { type: "string", required: true },
  x: { type: "number", required: true, default: 0 },
  y: { type: "number", required: true, default: 0 },
});

const User = mongoose.model("User", userSchema);

export default User;
