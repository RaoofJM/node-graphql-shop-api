import ProductSpec from "../../database/model/productSpec";
import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import ProductSpecRepo from "../../database/repository/productSpec";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllProductSpecs: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      validator(joiSchema.find, args);

      const page = args.page || 1;
      const limit = args.limit || 10;
      const productSpecs = await ProductSpecRepo.findByCategory(args.category);
      if (!productSpecs) throw createError("not found", 404);
      const paginatedProductSpec = paginateArray(productSpecs, page, limit);

      return paginatedProductSpec;
    },
  },
  Mutation: {
    productSpec: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        if (token && levels.includes("admin")) {
          validator(joiSchema.create, args.input);

          const productSpec: ProductSpec = args.input;
          const result = await ProductSpecRepo.create(productSpec);
          if (!result) throw createError("product spec wasn't saved", 500);

          return {
            status: 200,
            message: "success",
          };
        } else {
          throw createError("access denied", 402);
        }
      } else {
        throw createError("access denied", 402);
      }
    },
  },
};

export default resolver;
