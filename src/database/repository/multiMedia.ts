import { Types } from "mongoose";
import MultiMedia, { MultiMediaModel } from "../model/multiMedia";

export async function findAll(): Promise<MultiMedia[]> {
  return MultiMediaModel.find();
}

export async function create(multiMedia: MultiMedia): Promise<MultiMedia> {
  const now = new Date();
  multiMedia.createdAt = now;

  const createdMultiMedia = await MultiMediaModel.create(multiMedia);
  return createdMultiMedia;
}

export async function update(
  multiMedia: MultiMedia
): Promise<MultiMedia | null> {
  multiMedia.updatedAt = new Date();
  return MultiMediaModel.findByIdAndUpdate(multiMedia._id, multiMedia, {
    new: true,
  });
}

export async function remove(id: Types.ObjectId): Promise<MultiMedia | null> {
  return MultiMediaModel.findByIdAndRemove(id);
}

export async function findById(
  id: Types.ObjectId | string
): Promise<MultiMedia | null> {
  return MultiMediaModel.findById(id);
}

export default {
  create,
  findAll,
  update,
  findById,
  remove,
};
