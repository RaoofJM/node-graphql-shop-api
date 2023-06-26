import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Product";
export const COLLECTION_NAME = "products";

export default interface Product {
  _id?: Types.ObjectId;
  fname: string;
  ename: string;
  description: string;
  brand: Schema.Types.ObjectId;
  details: Schema.Types.ObjectId;
  attribute: (Schema.Types.ObjectId | undefined)[];
  category: Schema.Types.ObjectId;
  mainImage: Schema.Types.ObjectId;
  images?: [Schema.Types.ObjectId];
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Product>({
  fname: {
    type: Schema.Types.String,
    trim: true,
    required: true,
  },
  ename: {
    type: Schema.Types.String,
    trim: true,
    required: true,
  },
  description: {
    type: Schema.Types.String,
    trim: true,
    required: true,
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
    required: true,
  },
  details: [
    {
      type: Schema.Types.ObjectId,
      ref: "Detail",
      required: true,
    },
  ],
  attribute: [
    {
      type: Schema.Types.ObjectId,
      ref: "ProductAttribute",
      required: true,
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  mainImage: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "MultiMedia",
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      ref: "MultiMedia",
    },
  ],
});

export const ProductModel = model<Product>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
