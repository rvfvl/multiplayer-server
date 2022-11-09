import { Request, Response } from "express";

const checkCurrentUser = async (req: Request, res: Response) => {
  res.json({ message: "Hello222" });
};

export default {
  checkCurrentUser,
};
