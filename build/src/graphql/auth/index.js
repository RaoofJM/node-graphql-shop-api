"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authResolver = exports.authTypeDefs = void 0;
const schema_1 = __importDefault(require("./schema"));
const resolver_1 = __importDefault(require("./resolver"));
exports.authTypeDefs = schema_1.default;
exports.authResolver = resolver_1.default;
//# sourceMappingURL=index.js.map