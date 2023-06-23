import { Types } from "mongoose";
import Category, { CategoryModel } from "../model/category";

export async function findAll(): Promise<Category[]> {
  return CategoryModel.find().populate(["image", "parent"]);
}

export async function create(category: Category): Promise<Category> {
  const now = new Date();
  category.createdAt = now;

  const createdCategory = await CategoryModel.create(category);
  return createdCategory;
}

export async function update(category: Category): Promise<Category | null> {
  category.updatedAt = new Date();
  return CategoryModel.findByIdAndUpdate(category._id, category, { new: true }).populate(["image", "parent"]);
}

export async function remove(id: Types.ObjectId): Promise<Category | null> {
  return CategoryModel.findByIdAndRemove(id).populate(["image", "parent"]);
}

export async function findById(
  id: Types.ObjectId | string
): Promise<Category | null> {
  return CategoryModel.findById(id).populate(["image", "parent"]);
}

export async function findByName(name: string): Promise<Category | null> {
  return CategoryModel.findOne({ name }).populate(["image", "parent"]);
}

export async function findCategoriesWithoutParent(): Promise<Category[]> {
  return CategoryModel.find({ parent: null }).populate(["image", "parent"]);
}

export async function findCategoriesWithParent(): Promise<Category[]> {
  return CategoryModel.find({ parent: { $ne: null } }).populate(["image", "parent"]);
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findByName,
  findCategoriesWithParent,
  findCategoriesWithoutParent,
};
