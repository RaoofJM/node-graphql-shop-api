import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Detail";
export const COLLECTION_NAME = "details";

export default interface Detail {
  _id?: Types.ObjectId;
  label?: string;
  productDetail: Schema.Types.ObjectId;
  value: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Detail>({
  label: {
    type: Schema.Types.String,
    trim: true,
  },
  productDetail: {
    type: Schema.Types.ObjectId,
    ref: "ProductDetail",
    required: true,
  },
  value: {
    type: Schema.Types.String,
    trim: true,
    required: true,
  },
});

export const DetailBrandModel = model<Detail>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
