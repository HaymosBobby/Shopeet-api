import { Schema, Document, model, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: string;
  password: string;
  role: "customer" | "admin" | "vendor";
  isActive: boolean;
  emailVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  lastLogin?: Date;
  profile?: Types.ObjectId;
  activeCart?: Types.ObjectId;
  defaultAddress?: Types.ObjectId;
}

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin", "vendor"],
      default: "customer",
    },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    lastLogin: { type: Date },
    profile: { type: Schema.Types.ObjectId, ref: "Profile" },
    activeCart: { type: Schema.Types.ObjectId, ref: "Cart" },
    defaultAddress: { type: Schema.Types.ObjectId, ref: "Address" },
  },
  { timestamps: true }
);

// Hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
UserSchema.methods.comparePassword = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password);
};

const User = model<IUser>("User", UserSchema);
export default User;
