"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Brand";
exports.COLLECTION_NAME = "brands";
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
    category: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
    ],
    image: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "MultiMedia",
    },
});
exports.BrandModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=brand.js.map