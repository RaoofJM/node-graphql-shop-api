"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productResolver = exports.productTypeDefs = void 0;
const schema_1 = __importDefault(require("./schema"));
const resolver_1 = __importDefault(require("./resolver"));
exports.productTypeDefs = schema_1.default;
exports.productResolver = resolver_1.default;
//# sourceMappingURL=index.js.map