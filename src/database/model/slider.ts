import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Slider";
export const COLLECTION_NAME = "sliders";

export default interface Sliders {
  _id?: Types.ObjectId;
  name: string;
  images: [Schema.Types.ObjectId];
  default?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Sliders>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
  },
  images: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "MultiMedia",
    },
  ],
  default: {
    type: Schema.Types.Boolean,
    default: false,
  },
});

export const SliderModel = model<Sliders>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
