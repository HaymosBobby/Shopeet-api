import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../util/helper";

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", error);
  const errorMsg = error.message || "Something went wrong";
  const statusCode = error.statusCode || 500;
  sendResponse(res, { success: false, message: errorMsg, statusCode });
};

export default errorMiddleware;
