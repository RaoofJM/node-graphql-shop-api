import { Types } from "mongoose";
import ProductAttribute, {
  ProductAttributeModel,
} from "../model/productAttribute";

export async function findAll(): Promise<ProductAttribute[]> {
  return ProductAttributeModel.find().populate("seller").populate("warranty");
}

export async function create(
  productAttribute: ProductAttribute
): Promise<ProductAttribute> {
  const now = new Date();
  productAttribute.createdAt = now;

  const createdProductAttribute = await ProductAttributeModel.create(
    productAttribute
  );
  return createdProductAttribute;
}

export async function update(
  productAttribute: ProductAttribute
): Promise<ProductAttribute | null> {
  productAttribute.updatedAt = new Date();
  return ProductAttributeModel.findByIdAndUpdate(
    productAttribute._id,
    productAttribute,
    { new: true }
  )
    .populate("seller")
    .populate("warranty");
}

export async function remove(
  id: Types.ObjectId
): Promise<ProductAttribute | null> {
  return ProductAttributeModel.findByIdAndRemove(id)
    .populate("seller")
    .populate("warranty");
}

export async function findById(
  id: Types.ObjectId | string
): Promise<ProductAttribute | null> {
  return ProductAttributeModel.findById(id)
    .populate("seller")
    .populate("warranty");
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
};
