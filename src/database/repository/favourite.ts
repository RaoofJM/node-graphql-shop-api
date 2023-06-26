import { Types } from "mongoose";
import Favourite, { FavouriteModel } from "../model/favourite";

export async function findAll(): Promise<Favourite[]> {
  return FavouriteModel.find().populate("product").populate("user");
}

export async function create(favourite: Favourite): Promise<Favourite> {
  const now = new Date();
  favourite.createdAt = now;

  const createdFavourite = await FavouriteModel.create(favourite);
  return createdFavourite;
}

export async function update(favourite: Favourite): Promise<Favourite | null> {
  favourite.updatedAt = new Date();
  return FavouriteModel.findByIdAndUpdate(favourite._id, favourite, {
    new: true,
  })
    .populate("product")
    .populate("user");
}

export async function remove(id: Types.ObjectId): Promise<Favourite | null> {
  return FavouriteModel.findByIdAndRemove(id)
    .populate("product")
    .populate("user");
}

export async function findById(
  id: Types.ObjectId | string
): Promise<Favourite | null> {
  return FavouriteModel.findById(id).populate("product").populate("user");
}

export async function findByUser(
  userId: Types.ObjectId | string
): Promise<Favourite[]> {
  return FavouriteModel.find({ user: userId })
    .populate("product")
    .populate("user");
}

export async function findByProduct(
  productId: Types.ObjectId | string
): Promise<Favourite[]> {
  return FavouriteModel.find({ product: productId })
    .populate("product")
    .populate("user");
}

export async function findByUserAndProduct(
  userId: Types.ObjectId | string,
  productId: Types.ObjectId | string
): Promise<Favourite | null> {
  return FavouriteModel.findOne({ user: userId, product: productId })
    .populate("product")
    .populate("user");
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findByUser,
  findByProduct,
  findByUserAndProduct,
};
