"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../database/repository/user"));
const validator_1 = __importStar(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../helpers/jwt");
const resolver = {
    Mutation: {
        register: async (pararm, args) => {
            (0, validator_1.default)(joi_1.default.register, args);
            const emailExist = await user_1.default.findByEmail(args.email);
            const phoneExist = await user_1.default.findByPhone(args.phone);
            if (emailExist)
                throw (0, validator_1.createError)("email is already registered", 401);
            if (phoneExist)
                throw (0, validator_1.createError)("phone is already registered", 401);
            const user = args;
            console.log(user);
            await user_1.default.create(user);
            return {
                status: 200,
                message: "success",
            };
        },
    },
    Query: {
        login: async (params, args) => {
            (0, validator_1.default)(joi_1.default.login, args);
            const user = await user_1.default.findByPhone(args.phone);
            if (!user)
                throw (0, validator_1.createError)("user not found", 404);
            const isPasswordCorrect = await bcrypt_1.default.compare(args.password, user.password);
            if (!isPasswordCorrect)
                throw (0, validator_1.createError)("wrong password", 401);
            const token = await (0, jwt_1.createToken)({ id: user._id });
            return {
                status: 200,
                message: "success",
                token,
            };
        },
    },
};
exports.default = resolver;
//# sourceMappingURL=resolver.js.map