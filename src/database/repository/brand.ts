import { Types } from "mongoose";
import Brand, { BrandModel } from "../model/brand";

export async function findAll(): Promise<Brand[]> {
  return BrandModel.find().populate("category image");
}

export async function create(brand: Brand): Promise<Brand> {
  const now = new Date();
  brand.createdAt = now;

  const createdBrand = await BrandModel.create(brand);
  return createdBrand;
}

export async function update(brand: Brand): Promise<Brand | null> {
  brand.updatedAt = new Date();
  return BrandModel.findByIdAndUpdate(brand._id, brand, { new: true }).populate(
    ["category", "image"]
  );
}

export async function remove(id: Types.ObjectId): Promise<Brand | null> {
  return BrandModel.findByIdAndRemove(id).populate(["category", "image"]);
}

export async function findById(
  id: Types.ObjectId | string
): Promise<Brand | null> {
  return BrandModel.findById(id).populate("category image");
}

export async function findByName(name: string): Promise<Brand | null> {
  return BrandModel.findOne({ name }).populate(["category", "image"]);
}

export async function findBrandsWithoutCategory(): Promise<Brand[]> {
  return BrandModel.find({ category: null }).populate(["category", "image"]);
}

export async function findBrandsWithCategory(): Promise<Brand[]> {
  return BrandModel.find({ category: { $ne: null } }).populate([
    "category",
    "image",
  ]);
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findByName,
  findBrandsWithoutCategory,
  findBrandsWithCategory,
};
