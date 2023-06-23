import { Types, Schema, model } from "mongoose";
import ProductSpec, { ProductSpecModel } from "../model/productSpec";

export async function findAll(): Promise<ProductSpec[]> {
  return ProductSpecModel.find().populate("category");
}

export async function create(productSpec: ProductSpec): Promise<ProductSpec> {
  const now = new Date();
  productSpec.createdAt = now;

  const createdProductSpec = await ProductSpecModel.create(productSpec);
  return createdProductSpec;
}

export async function update(
  productSpec: ProductSpec
): Promise<ProductSpec | null> {
  productSpec.updatedAt = new Date();
  return ProductSpecModel.findByIdAndUpdate(productSpec._id, productSpec, {
    new: true,
  }).populate("category");
}

export async function remove(id: Types.ObjectId): Promise<ProductSpec | null> {
  return ProductSpecModel.findByIdAndRemove(id).populate("category");
}

export async function findById(
  id: Types.ObjectId | string
): Promise<ProductSpec | null> {
  return ProductSpecModel.findById(id).populate("category");
}

export async function findByName(name: string): Promise<ProductSpec | null> {
  return ProductSpecModel.findOne({ name }).populate("category");
}

export async function findByCategory(
  category: Types.ObjectId
): Promise<ProductSpec[]> {
  return ProductSpecModel.find({ category }).populate("category");
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
