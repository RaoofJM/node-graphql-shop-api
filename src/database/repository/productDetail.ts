import { Types, Schema, model } from "mongoose";
import ProductDetail, { ProductDetailModel } from "../model/productDetail";

export async function findAll(): Promise<ProductDetail[]> {
  return ProductDetailModel.find().populate("spec");
}

export async function create(productDetail: ProductDetail): Promise<ProductDetail> {
  const now = new Date();
  productDetail.createdAt = now;

  const createdProductDetail = await ProductDetailModel.create(productDetail);
  return createdProductDetail;
}

export async function update(productDetail: ProductDetail): Promise<ProductDetail | null> {
  productDetail.updatedAt = new Date();
  return ProductDetailModel.findByIdAndUpdate(productDetail._id, productDetail, { new: true }).populate("spec");
}

export async function remove(id: Types.ObjectId): Promise<ProductDetail | null> {
  return ProductDetailModel.findByIdAndRemove(id).populate("spec");
}

export async function findById(id: Types.ObjectId | string): Promise<ProductDetail | null> {
  return ProductDetailModel.findById(id).populate("spec");
}

export async function findByName(name: string): Promise<ProductDetail | null> {
  return ProductDetailModel.findOne({ name }).populate("spec");
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findByName,
};
