"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "P-Spec";
exports.COLLECTION_NAME = "p-specs";
-Spec;
{
    _id ?  : mongoose_1.Types.ObjectId;
    name: string;
    label ?  : string;
    category: mongoose_1.Schema.Types.ObjectId;
    createdAt ?  : Date;
    updatedAt ?  : Date;
}
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
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
});
exports.SurveyModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=p-spec.js.map