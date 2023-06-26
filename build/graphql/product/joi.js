"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    create: joi_1.default.object().keys({
        fname: joi_1.default.string().required(),
        ename: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        brand: joi_1.default.string().required(),
        attribute: joi_1.default.array().items().required(),
        details: joi_1.default.array().items().required(),
        description: joi_1.default.string().required(),
        mainImage: joi_1.default.string().required(),
        images: joi_1.default.array().items(joi_1.default.string()).required(),
    }),
    attributeCreate: joi_1.default.object().keys({
        warranty: joi_1.default.string().required(),
        seller: joi_1.default.string().required(),
        color: joi_1.default.string().required(),
        stock: joi_1.default.number().required(),
        price: joi_1.default.number().required(),
        discount: joi_1.default.number().required(),
    }),
    detailCreate: joi_1.default.object().keys({
        productDetail: joi_1.default.string().required(),
        value: joi_1.default.string().required(),
        label: joi_1.default.string(),
    }),
};
//# sourceMappingURL=joi.js.map