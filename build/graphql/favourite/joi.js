"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    create: joi_1.default.object().keys({
        product: joi_1.default.string().required(),
    }),
    find: joi_1.default.object().keys({
        user: joi_1.default.boolean().required(),
        page: joi_1.default.number(),
        limit: joi_1.default.number(),
    }),
};
//# sourceMappingURL=joi.js.map