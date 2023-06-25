import Brand from "../../database/model/brand";
import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import BrandRepo from "../../database/repository/brand";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllBrands: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        const page = args.page || 1;
        const limit = args.limit || 10;
        const brands = await BrandRepo.findAll();
        const paginatedBrands = paginateArray(brands, page, limit);

        return paginatedBrands;
      } else {
        throw createError("access denied", 402);
      }
    },
  },
  Mutation: {
    brand: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const brand: Brand = args.input;
        const result = await BrandRepo.create(brand);
        if (!result) throw createError("brand wasn't saved", 500);

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
