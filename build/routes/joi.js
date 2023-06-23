"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    imageUpload: joi_1.default.object()
        .keys({
        name: joi_1.default.string().required().messages({
            "any.required": "image is required",
        }),
        size: joi_1.default.number().max(3000000).messages({
            "number.max": "image can't be more than 3 MB",
        }),
        mimetype: joi_1.default.string().valid("image/jpeg", "image/png").messages({
            "any.only": "only jpg and png",
        }),
    })
        .unknown(true),
};
//# sourceMappingURL=joi.js.map