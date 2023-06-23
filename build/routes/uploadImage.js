"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authentication_1 = __importDefault(require("./middlewares/authentication"));
const router = express_1.default.Router();
router.get("/image-upload", authentication_1.default, (req, res, next) => {
    const levels = req.headers.levels;
    if (!levels.includes("admin"))
        return res.status(403).json({ status: 403, message: "access denied" });
    console.log(req.files);
    const image = req.files ? req.files.image : null;
    if (!image)
        return res
            .status(401)
            .json({ status: 401, message: "image is required" });
});
exports.default = router;
//# sourceMappingURL=uploadImage.js.map