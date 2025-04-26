import Otp, { useForType } from "../models/otp.model";
import User from "../models/user.model";
import { generateOTP, sendMail, throwError } from "../util/helper";

export const sendOtpService = async ({
  email,
  useFor,
}: {
  email: string;
  useFor: useForType;
}) => {
  // Check if user exists based on useFor
  if (useFor === "registration") {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throwError("User already exists with this email", 400);
      //   return;
    }
  } else {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throwError("No user found with this email", 400);
      //   return;
    }
  }

  // Generate OTP
  const otp = generateOTP();

  // Save OTP to db
  await Otp.create({
    email,
    otp,
    useFor,
  });

  // Select email subject based on useFor type
  const subjects = {
    registration: "Registration Verification Code",
    passwordReset: "Password Reset Code",
  };

  const emailSubject = subjects[useFor];

  // Send OTP via email
  await sendMail(
    email,
    emailSubject,
    useFor === "registration"
      ? `Use the code below to complete your registration process <br> ${otp}`
      : `Use the code below to reset your password <br> ${otp}`
  );

  return { message: "OTP sent successfully", otp };
};
