import otpGenerator from "otp-generator";
import { Response } from "express";
import {
  ResponseDataInterface,
  TokenPayload,
  TokenVerificationResult,
  UserRequestType,
} from "./interface";

import jwt, { TokenExpiredError } from "jsonwebtoken";
import { transporter } from "../smtp/smtp";
// import randomstring from "randomstring";
// import moment from "moment-timezone";

// Utility function to throw Errors
export const throwError = (message: string, statusCode: number): never => {
  const error: any = new Error(message);
  (error as any).statusCode = statusCode;
  throw error;
};

// Utility function to send response
export const sendResponse = (
  res: Response,
  {
    success,
    message = undefined,
    data = undefined,
    statusCode = 200,
  }: ResponseDataInterface
): Response => {
  return res.status(statusCode).json({
    success,
    status: success ? "success" : "error",
    message,
    data,
  });
};

// Utility function to generate OTP
export const generateOTP = (): string => {
  const otp: string = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
};

// Utility function to generate Tokens
// export const generateToken = <T extends TokenPayload>(
//   payload: T,
//   tokenType:
//     | "access"
//     | "refresh"
//     | "login"
//     | "passwordReset"
//     | "emailVerification"
//     | "twoFactorAuth"
//     | "changePassword"
// ): string => {
//   const secrets = {
//     access: process.env.JWT_ACCESS_SECRET as string,
//     refresh: process.env.JWT_REFRESH_SECRET as string,
//     login: process.env.JWT_LOGIN_SECRET as string,
//     passwordReset: process.env.JWT_PASSWORD_SECRET as string,
//     emailVerification: process.env.JWT_EMAIL_SECRET as string,
//     twoFactorAuth: process.env.JWT_EMAIL_2FA_SECRET as string,
//     changePassword: process.env.JWT_CHANGE_PASS_SECRET as string,
//   };

//   const expirations = {
//     access: "15m",
//     refresh: "7d",
//     login: "5m",
//     passwordReset: "5m",
//     emailVerification: "5m",
//     twoFactorAuth: "5m",
//     changePassword: "5m",
//   };

//   const secret = secrets[tokenType];
//   const expiresIn = expirations[tokenType];

//   //   return jwt.sign(payload, secret, { expiresIn });
//   return jwt.sign(payload, secret, { expiresIn });
// };

// // Utility function to verify Tokens
// export const verifyToken = (
//   token: string,
//   tokenType:
//     | "access"
//     | "refresh"
//     | "login"
//     | "passwordReset"
//     | "emailVerification"
//     | "twoFactorAuth"
//     | "changePassword"
// ): TokenVerificationResult => {
//   const secrets = {
//     access: process.env.JWT_ACCESS_SECRET as string,
//     refresh: process.env.JWT_REFRESH_SECRET as string,
//     login: process.env.JWT_LOGIN_SECRET as string,
//     passwordReset: process.env.JWT_PASSWORD_SECRET as string,
//     emailVerification: process.env.JWT_EMAIL_SECRET as string,
//     twoFactorAuth: process.env.JWT_EMAIL_2FA_SECRET as string,
//     changePassword: process.env.JWT_CHANGE_PASS_SECRET as string,
//   };

//   try {
//     const decoded = jwt.verify(token, secrets[tokenType]) as UserRequestType;
//     return { valid: true, expired: false, decoded };
//   } catch (error: any) {
//     if (error instanceof TokenExpiredError) {
//       return { valid: false, expired: true, decoded: null };
//     }

//     return { valid: false, expired: false, decoded: null };
//   }
// };

// Utility function to send mail to users
export const sendMail = async (
  email: string,
  subject: string,
  message: string,
  welcome: boolean
) => {
  const mailOptions = {
    from: `${welcome ? "Matthew" : "Nodepay"} <noreply@nodepay.com>`,
    to: email,
    subject: subject,
    html: message,
  };

  try {
    const response = await transporter.sendMail(mailOptions);
    console.log(response);
  } catch (error: any) {
    console.log(error, `Error while sending mail: ${error.message}`);
    throw new Error(error.message);
  }
};
