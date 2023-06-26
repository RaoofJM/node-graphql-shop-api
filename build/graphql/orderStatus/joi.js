"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    create: joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        image: joi_1.default.string().required(),
        default: joi_1.default.boolean(),
    }),
};
//# sourceMappingURL=joi.js.map