import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Category";
export const COLLECTION_NAME = "categories";

export default interface Category {
  _id?: Types.ObjectId;
  name: string;
  label?: string;
  parent?: Schema.Types.ObjectId;
  image?: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Category>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  label: {
    type: Schema.Types.String,
    trim: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  image: {
    type: Schema.Types.ObjectId,
    ref: "MultiMedia",
  },
});

export const CategoryModel = model<Category>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
