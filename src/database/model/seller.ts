import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Seller";
export const COLLECTION_NAME = "sellers";

export default interface Seller {
  _id?: Types.ObjectId;
  name: string;
  label?: string;
  category: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Seller>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  label: {
    type: Schema.Types.String,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

export const SellerModel = model<Seller>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
