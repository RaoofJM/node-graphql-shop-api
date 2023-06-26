import Favourite from "../../database/model/favourite";
import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import UserRepo from "../../database/repository/user";
import ProductRepo from "../../database/repository/product";
import FavouriteRepo from "../../database/repository//favourite";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllFavourites: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        const page = args.page || 1;
        const limit = args.limit || 10;
        if (args.user) {
          const favourites = await FavouriteRepo.findByUser(token.id);
          const paginatedFavourties = paginateArray(favourites, page, limit);

          return paginatedFavourties;
        } else {
          const favourites = await FavouriteRepo.findAll();
          const paginatedFavourties = paginateArray(favourites, page, limit);

          return paginatedFavourties;
        }
      } else {
        throw createError("access denied", 402);
      }
    },
  },
  Mutation: {
    favourite: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const product = await ProductRepo.findById(args.input.product);
        const user = await UserRepo.findById(token.id);

        if (!product) throw createError("no product found", 404);
        if (!user) throw createError("no user found", 404);

        const isProductInUserFavourites =
          await FavouriteRepo.findByUserAndProduct(
            token.id,
            args.input.product
          );

        if (isProductInUserFavourites?._id) {
          const result = await FavouriteRepo.remove(
            isProductInUserFavourites._id
          );
          if (!result) throw createError("favoutire wasn't saved", 500);

          return {
            status: 200,
            message: "success",
          };
        } else {
          const favourite: Favourite = args.input;
          favourite.user = token.id;
          const result = await FavouriteRepo.create(favourite);
          if (!result) throw createError("favoutire wasn't saved", 500);

          return {
            status: 200,
            message: "success",
          };
        }
      } else {
        throw createError("access denied", 402);
      }
    },
  },
};

export default resolver;
