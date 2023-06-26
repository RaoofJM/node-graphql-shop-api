"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const validator_2 = __importDefault(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const orderStatus_1 = __importDefault(require("../../database/repository/orderStatus"));
const utils_1 = require("../../helpers/utils");
const resolver = {
    Query: {
        getAllOrderStatus: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                const page = args.page || 1;
                const limit = args.limit || 10;
                const orderStatuses = await orderStatus_1.default.findAll();
                const paginatedOrderStatuses = (0, utils_1.paginateArray)(orderStatuses, page, limit);
                return paginatedOrderStatuses;
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
    Mutation: {
        orderStatus: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.create, args.input);
                const orderStatus = args.input;
                const result = await orderStatus_1.default.create(orderStatus);
                if (!result)
                    throw (0, validator_1.createError)("order status wasn't saved", 500);
                return {
                    status: 200,
                    message: "success",
                };
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
};
exports.default = resolver;
//# sourceMappingURL=resolver.js.map