import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "OrderStatus";
export const COLLECTION_NAME = "orderStatuses";

export default interface OrderStatus {
  _id?: Types.ObjectId;
  name: string;
  image: Schema.Types.ObjectId;
  default?: Boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<OrderStatus>({
  name: {
    type: Schema.Types.String,
    required: true,
    trim: true,
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

export const OrderStatusModel = model<OrderStatus>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
