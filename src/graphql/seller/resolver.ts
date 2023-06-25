import Seller from "../../database/model/seller";
import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import SellerRepo from "../../database/repository/seller";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllSellers: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      validator(joiSchema.find, args);

      const page = args.page || 1;
      const limit = args.limit || 10;
      const sellers = await SellerRepo.findByCategory(args.category);
      if (!sellers) throw createError("not found", 404);
      const paginatedSellers = paginateArray(sellers, page, limit);

      return paginatedSellers;
    },
  },
  Mutation: {
    seller: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const seller: Seller = args.input;
        const result = await SellerRepo.create(seller);
        if (!result) throw createError("seller wasn't saved", 500);

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
