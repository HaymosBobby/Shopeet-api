import mongoose, { Document, model, Schema } from "mongoose";

interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
}

// Declare the Schema of the Mongo model
const userSchema = new Schema<UserInterface>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Export the model
const User = model<UserInterface>("User", userSchema);
