"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Product";
exports.COLLECTION_NAME = "products";
const schema = new mongoose_1.Schema({
    fname: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        required: true,
    },
    ename: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        required: true,
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        required: true,
    },
    brand: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Brand",
        required: true,
    },
    details: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Detail",
            required: true,
        },
    ],
    attribute: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "ProductAttribute",
            required: true,
        },
    ],
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    mainImage: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "MultiMedia",
    },
    images: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "MultiMedia",
        },
    ],
});
exports.ProductModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=product.js.map