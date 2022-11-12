import mongoose from "mongoose";

export interface IUser {
  username: string;
  location: string;
  positionX: number;
  positionY: number;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: "string", required: true },
  location: { type: "string", required: true },
  positionX: { type: "number", required: true, default: 0 },
  positionY: { type: "number", required: true, default: 0 },
});

const User = mongoose.model("User", userSchema);

export default User;
