import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const checkCurrentUser = async (req: Request, res: Response) => {
  //FETCH FROM DB BEFORE SENDING

  // @ts-ignore
  res.json({ user: req.user });
};

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username !== "admin" || password !== "test") {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const tempUser = {
    username: "admin",
  };

  const accessToken = jwt.sign(tempUser, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  res.json({ accessToken });
};

export default {
  checkCurrentUser,
  login,
};
