"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiMediaModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "MultiMedia";
exports.COLLECTION_NAME = "multiMedias";
const schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    dimWidth: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    dimHeight: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    format: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    dir: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
});
exports.MultiMediaModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=multiMedia.js.map