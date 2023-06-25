import { Types } from "mongoose";
import Detail, { DetailBrandModel } from "../model/detail";

export async function findAll(): Promise<Detail[]> {
  return DetailBrandModel.find().populate("productDetail");
}

export async function create(detail: Detail): Promise<Detail> {
  const now = new Date();
  detail.createdAt = now;

  const createdDetail = await DetailBrandModel.create(detail);
  return createdDetail.populate("productDetail");
}

export async function update(detail: Detail): Promise<Detail | null> {
  detail.updatedAt = new Date();
  return DetailBrandModel.findByIdAndUpdate(detail._id, detail, {
    new: true,
  }).populate("productDetail");
}

export async function remove(id: Types.ObjectId): Promise<Detail | null> {
  return DetailBrandModel.findByIdAndRemove(id).populate("productDetail");
}

export async function findById(
  id: Types.ObjectId | string
): Promise<Detail | null> {
  return DetailBrandModel.findById(id).populate("productDetail");
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
};
