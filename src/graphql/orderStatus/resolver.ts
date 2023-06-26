import OrderStatus from "../../database/model/orderStatus";
import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import OrderStatusRepo from "../../database/repository/orderStatus";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllOrderStatus: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        const page = args.page || 1;
        const limit = args.limit || 10;
        const orderStatuses = await OrderStatusRepo.findAll();
        const paginatedOrderStatuses = paginateArray(orderStatuses, page, limit);

        return paginatedOrderStatuses;
      } else {
        throw createError("access denied", 402);
      }
    },
  },
  Mutation: {
    orderStatus: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const orderStatus: OrderStatus = args.input;
        const result = await OrderStatusRepo.create(orderStatus);
        if (!result) throw createError("order status wasn't saved", 500);

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
