"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Banner";
exports.COLLECTION_NAME = "banners";
const schema = new mongoose_1.Schema({
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    image: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "MultiMedia",
    },
    default: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
});
exports.BannerModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=banner.js.map