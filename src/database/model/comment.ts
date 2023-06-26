import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Comment";
export const COLLECTION_NAME = "comments";

export default interface Comment {
  _id?: Types.ObjectId;
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  valueSurveys: [Schema.Types.ObjectId];
  title: string;
  description: string;
  negative?: [string];
  positive?: [string];
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Comment>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  valueSurveys: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ValueSurvey",
    },
  ],
  title: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  description: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  negative: [
    {
      type: Schema.Types.String,
    },
  ],
  positive: [
    {
      type: Schema.Types.String,
    },
  ],
});

export const CommentModel = model<Comment>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
