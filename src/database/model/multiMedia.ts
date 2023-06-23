import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "MultiMedia";
export const COLLECTION_NAME = "multiMedias";

export default interface MultiMedia {
  _id?: Types.ObjectId;
  name: string;
  dimWidth?: string;
  dimHeight?: string;
  format: string;
  dir: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<MultiMedia>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  dimWidth: {
    type: Schema.Types.String,
    trim: true,
  },
  dimHeight: {
    type: Schema.Types.String,
    trim: true,
  },
  format: {
    type: Schema.Types.String,
    trim: true,
  },
  dir: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
});

export const MultiMediaModel = model<MultiMedia>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
