import { Types, Schema, model } from "mongoose";
import Banner, { BannerModel } from "../model/banner";

export async function findAll(): Promise<Banner[]> {
  return BannerModel.find().populate(["category", "image"]);
}

export async function create(banner: Banner): Promise<Banner> {
  const now = new Date();
  banner.createdAt = now;

  const createdBanner = await BannerModel.create(banner);
  return createdBanner;
}

export async function update(banner: Banner): Promise<Banner | null> {
  banner.updatedAt = new Date();
  return BannerModel.findByIdAndUpdate(banner._id, banner, {
    new: true,
  }).populate(["category", "image"]);
}

export async function remove(id: Types.ObjectId): Promise<Banner | null> {
  return BannerModel.findByIdAndRemove(id).populate(["category", "image"]);
}

export async function findById(
  id: Types.ObjectId | string
): Promise<Banner | null> {
  return BannerModel.findById(id).populate(["category", "image"]);
}

export async function findBannersByCategory(
  categoryId: Types.ObjectId | string
): Promise<Banner[]> {
  return BannerModel.find({ category: categoryId }).populate([
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
  findBannersByCategory,
};
