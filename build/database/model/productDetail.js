"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDetailModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "ProductDetail";
exports.COLLECTION_NAME = "productDetails";
const schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    label: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    spec: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ProductSpec",
        required: true,
    },
});
exports.ProductDetailModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=productDetail.js.map