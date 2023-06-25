import Warranty from "../../database/model/warranty";
import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import WarrantyRepo from "../../database/repository/warranty";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllWarrantys: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        const page = args.page || 1;
        const limit = args.limit || 10;
        const warrantys = await WarrantyRepo.findAll();
        if (!warrantys) throw createError("not found", 404);
        const paginatedWarrantys = paginateArray(warrantys, page, limit);

        return paginatedWarrantys;
      } else {
        throw createError("access denied", 402);
      }
    },
  },
  Mutation: {
    warranty: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const warranty: Warranty = args.input;
        const result = await WarrantyRepo.create(warranty);
        if (!result) throw createError("warranty wasn't saved", 500);

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
