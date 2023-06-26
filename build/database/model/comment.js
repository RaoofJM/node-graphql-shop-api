"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Comment";
exports.COLLECTION_NAME = "comments";
const schema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
    },
    valueSurveys: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            required: true,
            ref: "ValueSurvey",
        },
    ],
    title: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    description: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    negative: [
        {
            type: mongoose_1.Schema.Types.String,
        },
    ],
    positive: [
        {
            type: mongoose_1.Schema.Types.String,
        },
    ],
});
exports.CommentModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=comment.js.map