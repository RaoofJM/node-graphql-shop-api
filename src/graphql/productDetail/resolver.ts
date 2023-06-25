import ProductDetail from "../../database/model/productDetail";
import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import ProductDetailRepo from "../../database/repository/productDetail";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllProductDetails: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        const page = args.page || 1;
        const limit = args.limit || 10;
        const productDetails = await ProductDetailRepo.findAll();
        const paginatedProductDetails = paginateArray(
          productDetails,
          page,
          limit
        );

        return paginatedProductDetails;
      } else {
        throw createError("access denied", 402);
      }
    },
  },
  Mutation: {
    productDetail: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const productDetail: ProductDetail = args.input;
        const result = await ProductDetailRepo.create(productDetail);
        if (!result) throw createError("product detail wasn't saved", 500);

        return {
          status: 200,
          message: "success",
        };
      } else {
        throw createError("access denied", 402);
      }
    },
  },
};

export default resolver;
