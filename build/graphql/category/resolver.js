"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const validator_2 = __importDefault(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const category_1 = __importDefault(require("../../database/repository/category"));
const utils_1 = require("../../helpers/utils");
const resolver = {
    Query: {
        getAllCategory: async (params, args, { token, levels }) => {
            const page = args.page || 1;
            const limit = args.limit || 10;
            if (args.mainCategory) {
                const category = await category_1.default.findCategoriesWithoutParent();
                const paginatedCategory = (0, utils_1.paginateArray)(category, page, limit);
                return paginatedCategory;
            }
            else if (!args.mainCategory && args.parentCategory) {
                const category = await category_1.default.findCategoriesWithParent();
                const paginatedCategory = (0, utils_1.paginateArray)(category, page, limit);
                return paginatedCategory;
            }
            else {
                const category = await category_1.default.findAll();
                const paginatedCategory = (0, utils_1.paginateArray)(category, page, limit);
                return paginatedCategory;
            }
        },
    },
    Mutation: {
        category: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.create, args.input);
                const category = args.input;
                const result = await category_1.default.create(category);
                if (!result)
                    throw (0, validator_1.createError)("category wasn't saved", 500);
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