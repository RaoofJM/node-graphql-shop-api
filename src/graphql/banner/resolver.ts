import Banner from "../../database/model/banner";
import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import BannerRepo from "../../database/repository/banner";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllBanners: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.find, args);

        const page = args.page || 1;
        const limit = args.limit || 10;
        const banners = await BannerRepo.findBannersByCategory(args.category);
        const paginatedBanners = paginateArray(banners, page, limit);

        return paginatedBanners;
      } else {
        throw createError("access denied", 402);
      }
    },
  },
  Mutation: {
    banner: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const banner: Banner = args.input;
        const result = await BannerRepo.create(banner);
        if (!result) throw createError("banner wasn't saved", 500);

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
