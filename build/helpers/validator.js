"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const logger_1 = __importDefault(require("../core/logger"));
function createError(message, code, customProperties) {
    const formattedError = {
        message,
        extensions: {
            code,
            ...customProperties,
        },
    };
    return formattedError;
}
exports.createError = createError;
exports.default = (schema, data) => {
    const { error } = schema.validate(data);
    if (!error)
        return true;
    const { details } = error;
    const message = details.map((i) => i.message.replace(/['"]+/g, "")).join(",");
    logger_1.default.error(message);
    const formattedError = createError(message, 401);
    throw formattedError;
};
//# sourceMappingURL=validator.js.map