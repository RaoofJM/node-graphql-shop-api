import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import CategoryRepo from "../../database/repository/category";
import Category from "../../database/model/category";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllCategory: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      const page = args.page || 1;
      const limit = args.limit || 10;

      if (args.mainCategory) {
        const category = await CategoryRepo.findCategoriesWithoutParent();
        const paginatedCategory = paginateArray(category, page, limit);

        return paginatedCategory;
      } else if (!args.mainCategory && args.parentCategory) {
        const category = await CategoryRepo.findCategoriesWithParent();
        const paginatedCategory = paginateArray(category, page, limit);

        return paginatedCategory;
      } else {
        const category = await CategoryRepo.findAll();
        const paginatedCategory = paginateArray(category, page, limit);

        return paginatedCategory;
      }
    },
  },
  Mutation: {
    category: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const category: Category = args.input;
        const result = await CategoryRepo.create(category);
        if (!result) throw createError("category wasn't saved", 500);

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
