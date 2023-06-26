"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const validator_2 = __importDefault(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const category_1 = __importDefault(require("../../database/repository/category"));
const brand_1 = __importDefault(require("../../database/repository/brand"));
const warranty_1 = __importDefault(require("../../database/repository/warranty"));
const seller_1 = __importDefault(require("../../database/repository/seller"));
const multiMedia_1 = __importDefault(require("../../database/repository/multiMedia"));
const productAttribute_1 = __importDefault(require("../../database/repository/productAttribute"));
const detail_1 = __importDefault(require("../../database/repository/detail"));
const productDetail_1 = __importDefault(require("../../database/repository/productDetail"));
const product_1 = __importDefault(require("../../database/repository/product"));
const utils_1 = require("../../helpers/utils");
const resolver = {
    Query: {
        getAllProducts: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                const page = args.page || 1;
                const limit = args.limit || 10;
                const products = await product_1.default.findAll();
                const paginatedProducts = (0, utils_1.paginateArray)(products, page, limit);
                return paginatedProducts;
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
    Mutation: {
        product: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.create, args.input);
                const category = await category_1.default.findById(args.input.category);
                const brand = await brand_1.default.findById(args.input.brand);
                const mainImage = await multiMedia_1.default.findById(args.input.mainImage);
                if (!category)
                    throw (0, validator_1.createError)("category is not valid", 401);
                if (!brand)
                    throw (0, validator_1.createError)("brand is not valid", 401);
                if (!mainImage)
                    throw (0, validator_1.createError)("mainImage is not valid", 401);
                const attribute = await saveAttribute(args.input.attribute);
                const details = await saveDetails(args.input.details);
                if (attribute.length === 0 || details.length === 0)
                    throw (0, validator_1.createError)("attributes or details are not valid", 401);
                args.input.attribute = attribute;
                args.input.details = details;
                const product = args.input;
                await product_1.default.create(product);
                return {
                    status: 200,
                    message: "succes",
                };
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
};
async function saveAttribute(attributes) {
    try {
        let arr = [];
        for (let index = 0; index < attributes.length; index++) {
            const attribute = attributes[index];
            (0, validator_2.default)(joi_1.default.attributeCreate, attribute);
            const warranty = await warranty_1.default.findById(String(attribute.warranty));
            const seller = await seller_1.default.findById(String(attribute.seller));
            if (!warranty)
                throw (0, validator_1.createError)("warranty is not valid", 401);
            if (!seller)
                throw (0, validator_1.createError)("seller is not valid", 401);
            const op = await productAttribute_1.default.create(attribute);
            arr[index] = op._id;
        }
        return arr;
    }
    catch (err) {
        throw err;
    }
}
async function saveDetails(details) {
    try {
        let arr = [];
        for (let index = 0; index < details.length; index++) {
            const detail = details[index];
            (0, validator_2.default)(joi_1.default.detailCreate, detail);
            const productDetail = await productDetail_1.default.findById(String(detail.productDetail));
            if (!productDetail)
                throw (0, validator_1.createError)("productDetail is not valid", 401);
            const op = await detail_1.default.create(detail);
            arr[index] = op._id;
        }
        return arr;
    }
    catch (err) {
        throw err;
    }
}
exports.default = resolver;
//# sourceMappingURL=resolver.js.map