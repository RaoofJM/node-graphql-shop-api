import { Types } from "mongoose";
import OrderStatus, { OrderStatusModel } from "../model/orderStatus";

export async function findAll(): Promise<OrderStatus[]> {
  return OrderStatusModel.find().populate("image");
}

export async function create(orderStatus: OrderStatus): Promise<OrderStatus> {
  const now = new Date();
  orderStatus.createdAt = now;

  const createdOrderStatus = await OrderStatusModel.create(orderStatus);
  return createdOrderStatus;
}

export async function update(
  orderStatus: OrderStatus
): Promise<OrderStatus | null> {
  orderStatus.updatedAt = new Date();
  return OrderStatusModel.findByIdAndUpdate(orderStatus._id, orderStatus, {
    new: true,
  }).populate("image");
}

export async function remove(id: Types.ObjectId): Promise<OrderStatus | null> {
  return OrderStatusModel.findByIdAndRemove(id).populate("image");
}

export async function findById(
  id: Types.ObjectId | string
): Promise<OrderStatus | null> {
  return OrderStatusModel.findById(id).populate("image");
}

export async function findDefaultOrderStatus(): Promise<OrderStatus | null> {
  return OrderStatusModel.findOne({ default: true }).populate("image");
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findDefaultOrderStatus,
};
