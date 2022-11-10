import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const protectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const user = jwt.verify(token, process.env.SECRET_KEY!);

    if (!user) {
      return res.status(401).json({ message: "Unable to find a user." });
    }

    // @ts-ignore
    req.user = user;

    next();
  } catch (error) {
    console.log("ERROR", error);
  }
};
