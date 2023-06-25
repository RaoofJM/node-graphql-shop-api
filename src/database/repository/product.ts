import { Types, Schema, model } from "mongoose";
import Product, { ProductModel } from "../model/product";

export async function findAll(): Promise<Product[]> {
  return ProductModel.find().populate([
    "brand",
    "details",
    "attribute",
    "category",
    "mainImage",
    "images",
  ]);
}

export async function create(product: Product): Promise<Product> {
  const now = new Date();
  product.createdAt = now;

  const createdProduct = await ProductModel.create(product);
  return createdProduct;
}

export async function update(product: Product): Promise<Product | null> {
  product.updatedAt = new Date();
  return ProductModel.findByIdAndUpdate(product._id, product, {
    new: true,
  }).populate([
    "brand",
    "details",
    "attribute",
    "category",
    "mainImage",
    "images",
  ]);
}

export async function remove(id: Types.ObjectId): Promise<Product | null> {
  return ProductModel.findByIdAndRemove(id).populate([
    "brand",
    "details",
    "attribute",
    "category",
    "mainImage",
    "images",
  ]);
}

export async function findById(
  id: Types.ObjectId | string
): Promise<Product | null> {
  return ProductModel.findById(id).populate([
    "brand",
    "details",
    "attribute",
    "category",
    "mainImage",
    "images",
  ]);
}

export async function findByCategory(
  categoryId: Types.ObjectId | string
): Promise<Product[]> {
  return ProductModel.find({ category: categoryId }).populate([
    "brand",
    "details",
    "attribute",
    "category",
    "mainImage",
    "images",
  ]);
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findByCategory,
};
