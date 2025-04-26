import { NextFunction, Request, Response } from "express";
import { sendResponse } from "../util/helper";
import { OtpType } from "../schema/auth.schema";
import * as AuthServices from "../services/auth.service";

// Send Otp
export const sendOtp = async (
  req: Request<{}, {}, OtpType>,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get input data
    const { email, useFor } = req.body;

    const result = await AuthServices.sendOtpService({ email, useFor });

    // Send Response
    sendResponse(res, {
      success: true,
      message: result.message,
      statusCode: 201,
      data: {
        otp: result.otp,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const registerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("I want to register");
};
