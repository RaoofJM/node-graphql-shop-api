import { Types, Schema, model } from "mongoose";
import Seller, { SellerModel } from "../model/seller";

export async function findAll(): Promise<Seller[]> {
  return SellerModel.find().populate("category");
}

export async function create(seller: Seller): Promise<Seller> {
  const now = new Date();
  seller.createdAt = now;

  const createdSeller = await SellerModel.create(seller);
  return createdSeller;
}

export async function update(seller: Seller): Promise<Seller | null> {
  seller.updatedAt = new Date();
  return SellerModel.findByIdAndUpdate(seller._id, seller, { new: true }).populate("category");
}

export async function remove(id: Types.ObjectId): Promise<Seller | null> {
  return SellerModel.findByIdAndRemove(id).populate("category");
}

export async function findById(id: Types.ObjectId | string): Promise<Seller | null> {
  return SellerModel.findById(id).populate("category");
}

export async function findByName(name: string): Promise<Seller | null> {
  return SellerModel.findOne({ name }).populate("category");
}

export async function findByCategory(categoryId: Types.ObjectId | string): Promise<Seller[]> {
  return SellerModel.find({ category: categoryId }).populate("category");
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findByName,
  findByCategory,
};