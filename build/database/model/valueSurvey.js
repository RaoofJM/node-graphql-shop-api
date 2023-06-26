"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueSurveyModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "ValueSurvey";
exports.COLLECTION_NAME = "valueSurveys";
const schema = new mongoose_1.Schema({
    value: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    survey: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Survey",
    },
});
exports.ValueSurveyModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=valueSurvey.js.map