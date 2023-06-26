import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "ValueSurvey";
export const COLLECTION_NAME = "valueSurveys";

export default interface ValueSurvey {
  _id?: Types.ObjectId;
  value: number;
  survey: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<ValueSurvey>({
  value: {
    type: Schema.Types.Number,
    required: true,
  },
  survey: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Survey",
  },
});

export const ValueSurveyModel = model<ValueSurvey>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
