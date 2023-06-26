import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Favourite";
export const COLLECTION_NAME = "favourites";

export default interface Favourite {
  _id?: Types.ObjectId;
  product: Schema.Types.ObjectId;
  user: Schema.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Favourite>({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const FavouriteModel = model<Favourite>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
