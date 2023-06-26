"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const validator_2 = __importDefault(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const user_1 = __importDefault(require("../../database/repository/user"));
const product_1 = __importDefault(require("../../database/repository/product"));
const favourite_1 = __importDefault(require("../../database/repository//favourite"));
const utils_1 = require("../../helpers/utils");
const resolver = {
    Query: {
        getAllFavourites: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                const page = args.page || 1;
                const limit = args.limit || 10;
                if (args.user) {
                    const favourites = await favourite_1.default.findByUser(token.id);
                    const paginatedFavourties = (0, utils_1.paginateArray)(favourites, page, limit);
                    return paginatedFavourties;
                }
                else {
                    const favourites = await favourite_1.default.findAll();
                    const paginatedFavourties = (0, utils_1.paginateArray)(favourites, page, limit);
                    return paginatedFavourties;
                }
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
    Mutation: {
        favourite: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.create, args.input);
                const product = await product_1.default.findById(args.input.product);
                const user = await user_1.default.findById(token.id);
                if (!product)
                    throw (0, validator_1.createError)("no product found", 404);
                if (!user)
                    throw (0, validator_1.createError)("no user found", 404);
                const isProductInUserFavourites = await favourite_1.default.findByUserAndProduct(token.id, args.input.product);
                if (isProductInUserFavourites?._id) {
                    const result = await favourite_1.default.remove(isProductInUserFavourites._id);
                    if (!result)
                        throw (0, validator_1.createError)("favoutire wasn't saved", 500);
                    return {
                        status: 200,
                        message: "success",
                    };
                }
                else {
                    const favourite = args.input;
                    favourite.user = token.id;
                    const result = await favourite_1.default.create(favourite);
                    if (!result)
                        throw (0, validator_1.createError)("favoutire wasn't saved", 500);
                    return {
                        status: 200,
                        message: "success",
                    };
                }
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
};
exports.default = resolver;
//# sourceMappingURL=resolver.js.map