"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    create: joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        label: joi_1.default.string(),
        spec: joi_1.default.array().items(joi_1.default.string()).required(),
    }),
};
//# sourceMappingURL=joi.js.map