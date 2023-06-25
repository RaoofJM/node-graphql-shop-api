import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Banner";
export const COLLECTION_NAME = "banners";

export default interface Banner {
  _id?: Types.ObjectId;
  category: Schema.Types.ObjectId;
  image: Schema.Types.ObjectId;
  default?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Banner>({
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "MultiMedia",
  },
  default: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

export const BannerModel = model<Banner>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
