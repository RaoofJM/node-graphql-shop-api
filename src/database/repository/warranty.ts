import { Types, Schema, model } from "mongoose";
import Warranty, { WarrantyModel } from "../model/warranty";

export async function findAll(): Promise<Warranty[]> {
  return WarrantyModel.find();
}

export async function create(warranty: Warranty): Promise<Warranty> {
  const now = new Date();
  warranty.createdAt = now;

  const createdWarranty = await WarrantyModel.create(warranty);
  return createdWarranty;
}

export async function update(warranty: Warranty): Promise<Warranty | null> {
  warranty.updatedAt = new Date();
  return WarrantyModel.findByIdAndUpdate(warranty._id, warranty, { new: true });
}

export async function remove(id: Types.ObjectId): Promise<Warranty | null> {
  return WarrantyModel.findByIdAndRemove(id);
}

export async function findById(
  id: Types.ObjectId | string
): Promise<Warranty | null> {
  return WarrantyModel.findById(id);
}

export async function findByName(name: string): Promise<Warranty | null> {
  return WarrantyModel.findOne({ name });
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findByName,
};
