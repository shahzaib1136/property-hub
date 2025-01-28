import mongoose, { Document, Schema } from "mongoose";

// Define the user interface extending mongoose Document
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  image: string;
  bookmarks: mongoose.Types.ObjectId[];
}

// Create the user schema
const userSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      //   trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email is already exists"],
      //   trim: true,
      //   lowercase: true,
    },
    image: {
      type: String,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Property",
      },
    ],
  },
  { timestamps: true }
);

// Create and export the User model, ensuring it is only defined once
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
