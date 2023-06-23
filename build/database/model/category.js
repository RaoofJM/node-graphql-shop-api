"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Category";
exports.COLLECTION_NAME = "categories";
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
    parent: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
    },
    image: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "MultiMedia",
    },
});
exports.CategoryModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=category.js.map