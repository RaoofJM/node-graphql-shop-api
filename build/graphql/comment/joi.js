"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    create: joi_1.default.object().keys({
        product: joi_1.default.string().required(),
        user: joi_1.default.string().required(),
        valueSurveys: joi_1.default.array().items(joi_1.default.required()).required(),
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        negative: joi_1.default.array().items(joi_1.default.string()),
        positive: joi_1.default.array().items(joi_1.default.string()),
    }),
    find: joi_1.default.object().keys({
        product: joi_1.default.string().required(),
        page: joi_1.default.number(),
        limit: joi_1.default.number(),
    }),
    createValueSurvey: joi_1.default.object().keys({
        survey: joi_1.default.string().required(),
        value: joi_1.default.number().required(),
    }),
};
//# sourceMappingURL=joi.js.map