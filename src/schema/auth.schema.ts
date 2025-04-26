import { z } from "zod";
import { strictZ } from "../util/zod";

// Validate Otp
export const otpSchema = z.object({
  body: strictZ.object({
    email: z
      .string({
        required_error: "'email' is required",
      })
      .email("Invalid email address"),
    useFor: z.enum(["registration", "passwordReset"], {
      required_error: "'useFor' is required",
    }),
  }),
});

export type OtpType = z.infer<typeof otpSchema>["body"];
