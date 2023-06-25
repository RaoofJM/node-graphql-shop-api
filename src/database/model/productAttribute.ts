import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "ProductAttribute";
export const COLLECTION_NAME = "productAttributes";

export default interface ProductAttribute {
  _id?: Types.ObjectId;
  seller: Schema.Types.ObjectId;
  warranty: Schema.Types.ObjectId;
  color: string;
  price: string;
  stock: number;
  discount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ProductAttribute>({
  seller: {
    type: Schema.Types.ObjectId,
    ref: "Seller",
    required: true,
  },
  warranty: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Warranty",
  },
  color: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  price: {
    type: Schema.Types.String,
    required: true,
  },
  stock: {
    type: Schema.Types.Number,
    required: true,
  },
  discount: {
    type: Schema.Types.Number,
    required: true,
  },
});

export const ProductAttributeModel = model<ProductAttribute>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
