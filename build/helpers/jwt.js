"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = exports.verifyToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envConfigs_1 = require("../config/envConfigs");
async function createToken(data, exp) {
    const finalExp = exp ? exp + "s" : envConfigs_1.tokenInfo.accessTokenValidity;
    return await jsonwebtoken_1.default.sign(data, envConfigs_1.tokenInfo.jwtSecret, {
        expiresIn: finalExp,
    });
}
exports.createToken = createToken;
async function verifyToken(token) {
    try {
        if (token) {
            const result = await jsonwebtoken_1.default.verify(token, envConfigs_1.tokenInfo.jwtSecret);
            return result;
        }
        else {
            return null;
        }
    }
    catch (err) {
        return null;
    }
}
exports.verifyToken = verifyToken;
async function decodeToken(token) {
    if (token) {
        return await jsonwebtoken_1.default.decode(token);
    }
    else {
        return null;
    }
}
exports.decodeToken = decodeToken;
//# sourceMappingURL=jwt.js.map