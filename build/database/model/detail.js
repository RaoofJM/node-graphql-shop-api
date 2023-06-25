"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DetailBrandModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Detail";
exports.COLLECTION_NAME = "details";
const schema = new mongoose_1.Schema({
    label: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    productDetail: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "ProductDetail",
        required: true,
    },
    value: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        required: true,
    },
});
exports.DetailBrandModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=detail.js.map