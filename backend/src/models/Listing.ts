import { Document, model, Schema, Types } from "mongoose";

export type AccommodationType = "flatmate" | "roommate";
export type LookingForGender = "male" | "female";

export interface IListing extends Document {
  postedBy: Types.ObjectId;
  postedByName: string;
  location: string;
  cityName: string;
  rent: number;
  accommodationType: AccommodationType;
  lookingForGender: LookingForGender;
  imageUrl?: string;
  isFeatured?: Boolean;
  contactNumber?: string;
  contactEmail?: string;
  facilities: string[];
  bookmarkedBy?: Types.ObjectId[];
}

const listingSchema = new Schema<IListing>(
  {
    postedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    postedByName: { type: String, required: true },
    location: { type: String, required: true },
    cityName: { type: String, required: true },
    rent: { type: Number, required: true },
    accommodationType: {
      type: String,
      enum: ["flatmate", "roommate", "pg"],
      required: true,
    },
    lookingForGender: {
      type: String,
      enum: ["male", "female", "any"],
      required: true,
    },
    imageUrl: { type: String },
    isFeatured: { type: Boolean, default: false },
    contactNumber: { type: String },
    contactEmail: { type: String, required: true },
    facilities: { type: [String], default: [] },
    bookmarkedBy: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  },
  { timestamps: true }
);

const Listing = model<IListing>("Listing", listingSchema);
export default Listing;