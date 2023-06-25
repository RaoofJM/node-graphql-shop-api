"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const validator_2 = __importDefault(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const banner_1 = __importDefault(require("../../database/repository/banner"));
const utils_1 = require("../../helpers/utils");
const resolver = {
    Query: {
        getAllBanners: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.find, args);
                const page = args.page || 1;
                const limit = args.limit || 10;
                const banners = await banner_1.default.findBannersByCategory(args.category);
                const paginatedBanners = (0, utils_1.paginateArray)(banners, page, limit);
                return paginatedBanners;
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
    Mutation: {
        banner: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.create, args.input);
                const banner = args.input;
                const result = await banner_1.default.create(banner);
                if (!result)
                    throw (0, validator_1.createError)("banner wasn't saved", 500);
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