import { Schema, model, Document } from "mongoose";

export type useForType = "registration" | "passwordReset";

export interface IOtp extends Document {
  email: string;
  otp: string;
  useFor: useForType;
  createdAt: Date;
}

const otpSchema = new Schema<IOtp>({
  email: {
    type: String,
    required: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  },
  otp: {
    type: String,
    required: true,
    match: /^\d{6}$/,
  },
  useFor: {
    type: String,
    enum: ["registration", "passwordReset"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

const Otp = model<IOtp>("Otp", otpSchema);
export default Otp;
