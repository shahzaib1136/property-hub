import mongoose, { Document, Schema } from "mongoose";

export interface IProperty extends Document {
  owner: mongoose.Types.ObjectId;
  name: string;
  type: "Apartment" | "Condo" | "House" | "Cottage Or Cabin" | "Chalet";
  description: string;
  location: {
    street?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  beds: number;
  baths: number;
  squareFeet: number;
  amenities: string[];
  rates: {
    weekly?: number;
    monthly?: number;
    nightly?: number;
  };
  sellerInfo: {
    name?: string;
    email?: string;
    phone?: string;
  };
  images: string[];
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const propertySchema: Schema = new Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    name: {
      type: String,
      required: true,
      //   trim: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    location: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipcode: { type: String },
    },
    beds: {
      type: Number,
      required: true,
    },
    baths: {
      type: Number,
      required: true,
    },
    square_feet: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
    rates: {
      weekly: {
        type: Number,
      },
      monthly: {
        type: Number,
      },
      nightly: { type: Number }, // Optional (only for certain property types)
    },
    seller_info: {
      name: { type: String },
      email: { type: String },
      phone: { type: String },
    },
    images: {
      type: [String], // URLs or file paths to images
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Property =
  mongoose.models.Property ||
  mongoose.model<IProperty>("Property", propertySchema);
export default Property;
