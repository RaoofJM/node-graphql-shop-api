"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const validator_2 = __importDefault(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const brand_1 = __importDefault(require("../../database/repository/brand"));
const utils_1 = require("../../helpers/utils");
const resolver = {
    Query: {
        getAllBrands: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                const page = args.page || 1;
                const limit = args.limit || 10;
                const brands = await brand_1.default.findAll();
                const paginatedBrands = (0, utils_1.paginateArray)(brands, page, limit);
                return paginatedBrands;
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
    Mutation: {
        brand: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.create, args.input);
                const brand = args.input;
                const result = await brand_1.default.create(brand);
                if (!result)
                    throw (0, validator_1.createError)("brand wasn't saved", 500);
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