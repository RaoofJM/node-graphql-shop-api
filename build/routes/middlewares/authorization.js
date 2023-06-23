"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../../helpers/jwt");
const user_1 = __importDefault(require("../../database/repository/user"));
const router = express_1.default.Router();
router.use(async (req, res, next) => {
    const token = (await (0, jwt_1.verifyToken)(req.headers.token));
    let user;
    let levels;
    if (token) {
        user = await user_1.default.findById(token.id);
        levels = user?.levels;
    }
    req.headers.token = token;
    req.headers.levels = levels;
});
//# sourceMappingURL=authorization.js.map