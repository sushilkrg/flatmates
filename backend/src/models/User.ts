import mongoose, { Document, model, Schema, Types } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  myListings?: Types.ObjectId[];
  myBookmarkedListings?: Types.ObjectId[];
  myTransactions?: Types.ObjectId[];
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    myListings: [{ type: Schema.Types.ObjectId, ref: "Listing", default: [] }],
    myBookmarkedListings: [
      { type: Schema.Types.ObjectId, ref: "Listing", default: [] },
    ],
    myTransactions: [
      { type: Schema.Types.ObjectId, ref: "Transaction", default: [] },
    ],
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);
export default User;