import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "ProductDetail";
export const COLLECTION_NAME = "productDetails";

export default interface ProductDetail {
  _id?: Types.ObjectId;
  name: string;
  label?: string;
  spec: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ProductDetail>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  label: {
    type: Schema.Types.String,
    trim: true,
  },
  spec: {
    type: Schema.Types.ObjectId,
    ref: "ProductSpec",
    required: true,
  },
});

export const ProductDetailModel = model<ProductDetail>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
