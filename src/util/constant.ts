import { CookieOptions } from "express";

export const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

export const nameRegex = /^[A-Za-zÀ-ÖØ-ÿ'-]+$/;

export const phoneNumberRegex = /^0[789][0-9]{9}$/;

export const otpRegex = /^\d{6}$/;

export const transactionPinRegex = /^\d{4}$/;

export const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const usernameRegex = /^(?!\d)[A-Za-z0-9_-]+$/;

export const accountNumRegex = /^[0-9]{10}$/;

export const bvnRegex = /^[0-9]{11}$/;

export const passwordMessage: string =
  "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character and must be minimum of 8 characters!";

export const nameMessage: string =
  "must start with a letter and can only contain letters, numbers, spaces, hyphens, or apostrophes";

export const otpMessage: string = "OTP must be a valid 6-digit number";

export const transactionPinMessage: string =
  "Transaction Pin must be a valid 4-digit number";

export const phoneNumberMessage: string = "Must be a valid phone number";

export const usernameMessage: string =
  "Username can only contain letters, numbers, hyphen(-) and underscore(_)!";

export const accountNumMessage: string =
  "Account number must be a valid 10 digits number!";

export const bvnMessage: string = "BVN must be a valid 11 digits number ";

export const cookieConfiguration: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Use secure in production
  sameSite: "strict",
  path: "/api/auth/refresh-token", // Restrict to the refresh token route
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};
