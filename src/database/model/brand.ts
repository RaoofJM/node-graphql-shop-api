import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Brand";
export const COLLECTION_NAME = "brands";

export default interface Brand {
  _id?: Types.ObjectId;
  name: string;
  label?: string;
  category: [Schema.Types.ObjectId];
  image: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Brand>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  label: {
    type: Schema.Types.String,
    trim: true,
  },
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],
  image: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "MultiMedia",
  },
});

export const BrandModel = model<Brand>(DOCUMENT_NAME, schema, COLLECTION_NAME);
