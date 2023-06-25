"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const validator_2 = __importDefault(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const warranty_1 = __importDefault(require("../../database/repository/warranty"));
const utils_1 = require("../../helpers/utils");
const resolver = {
    Query: {
        getAllWarrantys: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                const page = args.page || 1;
                const limit = args.limit || 10;
                const warrantys = await warranty_1.default.findAll();
                if (!warrantys)
                    throw (0, validator_1.createError)("not found", 404);
                const paginatedWarrantys = (0, utils_1.paginateArray)(warrantys, page, limit);
                return paginatedWarrantys;
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
    Mutation: {
        warranty: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.create, args.input);
                const warranty = args.input;
                const result = await warranty_1.default.create(warranty);
                if (!result)
                    throw (0, validator_1.createError)("warranty wasn't saved", 500);
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