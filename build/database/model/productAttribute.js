"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductAttributeModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "ProductAttribute";
exports.COLLECTION_NAME = "productAttributes";
const schema = new mongoose_1.Schema({
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    },
    warranty: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Warranty",
    },
    color: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    price: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    stock: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    discount: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
});
exports.ProductAttributeModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=productAttribute.js.map