"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const validator_2 = __importDefault(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const seller_1 = __importDefault(require("../../database/repository/seller"));
const utils_1 = require("../../helpers/utils");
const resolver = {
    Query: {
        getAllSellers: async (params, args, { token, levels }) => {
            (0, validator_2.default)(joi_1.default.find, args);
            const page = args.page || 1;
            const limit = args.limit || 10;
            const sellers = await seller_1.default.findByCategory(args.category);
            if (!sellers)
                throw (0, validator_1.createError)("not found", 404);
            const paginatedSellers = (0, utils_1.paginateArray)(sellers, page, limit);
            return paginatedSellers;
        },
    },
    Mutation: {
        seller: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.create, args.input);
                const seller = args.input;
                const result = await seller_1.default.create(seller);
                if (!result)
                    throw (0, validator_1.createError)("seller wasn't saved", 500);
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