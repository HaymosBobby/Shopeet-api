import { NextFunction, Request, Response } from "express";

export const registerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("I want to register");
};
