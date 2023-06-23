import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "ProductSpec";
export const COLLECTION_NAME = "productSpecs";

export default interface ProductSpec {
  _id?: Types.ObjectId;
  name: string;
  label?: string;
  category: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ProductSpec>({
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

export const ProductSpecModel = model<ProductSpec>(DOCUMENT_NAME, schema, COLLECTION_NAME);
