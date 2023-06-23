"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uploadImage_1 = __importDefault(require("./uploadImage"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.use(uploadImage_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map