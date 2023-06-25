import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import CategoryRepo from "../../database/repository/category";
import BrandRepo from "../../database/repository/brand";
import WarrantyRepo from "../../database/repository/warranty";
import SellerRepo from "../../database/repository/seller";
import MultiMediaRepo from "../../database/repository/multiMedia";
import ProductAttribute from "../../database/model/productAttribute";
import ProductAttributeRepo from "../../database/repository/productAttribute";
import Detail from "../../database/model/detail";
import DetailRepo from "../../database/repository/detail";
import ProductDetailRepo from "../../database/repository/productDetail";

const resolver = {
  Query: {},
  Mutation: {
    product: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const category = await CategoryRepo.findById(args.input.category);
        const brand = await BrandRepo.findById(args.input.brand);
        const mainImage = await MultiMediaRepo.findById(args.input.mainImage);

        if (!category) throw createError("category is not valid", 401);
        if (!brand) throw createError("brand is not valid", 401);
        if (!mainImage) throw createError("mainImage is not valid", 401);

        const attribute = await saveAttribute(args.input.attribute);
        const details = await saveDetails(args.input.details);
      } else {
        throw createError("access denied", 402);
      }
    },
  },
};

async function saveAttribute(attributes: [ProductAttribute]) {
  try {
    let arr = [];
    for (let index = 0; index < attributes.length; index++) {
      const attribute = attributes[index];

      validator(joiSchema.attributeCreate, attribute);

      const warranty = await WarrantyRepo.findById(String(attribute.warranty));
      const seller = await SellerRepo.findById(String(attribute.seller));

      if (!warranty) throw createError("warranty is not valid", 401);
      if (!seller) throw createError("seller is not valid", 401);

      const op = await ProductAttributeRepo.create(attribute);

      arr[index] = op._id;
    }

    return arr;
  } catch (err) {
    throw err;
  }
}

async function saveDetails(details: [Detail]) {
  try {
    let arr = [];
    for (let index = 0; index < details.length; index++) {
      const detail = details[index];

      validator(joiSchema.detailCreate, detail);

      const productDetail = await ProductDetailRepo.findById(
        String(detail.productDetail)
      );

      if (!productDetail) throw createError("productDetail is not valid", 401);

      const op = await DetailRepo.create(detail);

      arr[index] = op._id;
    }

    return arr;
  } catch (err) {
    throw err;
  }
}

export default resolver;
