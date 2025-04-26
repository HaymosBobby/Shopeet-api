import { Schema, Document, Types, model } from "mongoose";

export interface IProfile extends Document {
  user: Types.ObjectId;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: Date;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  profilePicture?: string;
  preferences?: {
    theme?: string;
    language?: string;
    currency?: string;
    newsletter?: boolean;
    marketingEmails?: boolean;
  };
}

const ProfileSchema = new Schema<IProfile>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: ["male", "female", "other", "prefer_not_to_say"],
    },
    profilePicture: { type: String },
    preferences: {
      theme: { type: String },
      language: { type: String },
      currency: { type: String },
      newsletter: { type: Boolean },
      marketingEmails: { type: Boolean },
    },
  },
  { timestamps: true }
);

const Profile = model<IProfile>("Profile", ProfileSchema);
export default Profile;
