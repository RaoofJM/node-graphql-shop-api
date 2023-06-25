import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Warranty";
export const COLLECTION_NAME = "warrantys";

export default interface Warranty {
  _id?: Types.ObjectId;
  name: string;
  label?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Warranty>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  label: {
    type: Schema.Types.String,
    trim: true,
  },
});

export const WarrantyModel = model<Warranty>(DOCUMENT_NAME, schema, COLLECTION_NAME);
