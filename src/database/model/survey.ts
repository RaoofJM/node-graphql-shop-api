import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Survey";
export const COLLECTION_NAME = "surveys";

export default interface Survey {
  _id?: Types.ObjectId;
  name: string;
  label?: string;
  category: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Survey>({
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

export const SurveyModel = model<Survey>(DOCUMENT_NAME, schema, COLLECTION_NAME);
