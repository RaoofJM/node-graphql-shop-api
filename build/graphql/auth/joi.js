"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    register: joi_1.default.object().keys({
        email: joi_1.default.string().email().required(),
        phone: joi_1.default.string().required(),
        fullname: joi_1.default.string().required(),
        password: joi_1.default.string().min(6).required(),
        confirmPassword: joi_1.default.string().valid(joi_1.default.ref("password")).required(),
    }),
    login: joi_1.default.object().keys({
        phone: joi_1.default.string().required(),
        password: joi_1.default.string().min(6).required(),
    }),
};
//# sourceMappingURL=joi.js.map