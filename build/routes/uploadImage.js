"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validator_1 = __importDefault(require("../helpers/validator"));
const authentication_1 = __importDefault(require("./middlewares/authentication"));
const joi_1 = __importDefault(require("./joi"));
const error_1 = require("./middlewares/error");
const app_root_path_1 = __importDefault(require("app-root-path"));
const shortid_1 = __importDefault(require("shortid"));
const sharp_1 = __importDefault(require("sharp"));
const image_size_1 = __importDefault(require("image-size"));
const multiMedia_1 = __importDefault(require("../database/repository/multiMedia"));
const fs_1 = __importDefault(require("fs"));
const router = express_1.default.Router();
router.post("/image-upload", authentication_1.default, async (req, res, next) => {
    try {
        const levels = req.headers.levels;
        if (!levels.includes("admin"))
            return res.status(403).json({ status: 403, message: "access denied" });
        const image = req.files ? req.files.image : null;
        if (!image)
            throw (0, error_1.createError)(401, "image is required");
        (0, validator_1.default)(joi_1.default.imageUpload, image);
        const date = new Date();
        const fileData = `${date.getFullYear()}/${date.getMonth() + 1}`;
        const dir = `public/uploads/${fileData}`;
        const folderPath = app_root_path_1.default.resolve(dir);
        fs_1.default.mkdirSync(folderPath, { recursive: true });
        const fileName = `${shortid_1.default.generate()}_${image.name}`;
        await (0, sharp_1.default)(image.data)
            .jpeg({
            quality: 60,
        })
            .toFile(`./public/uploads/${fileData}/${fileName}`)
            .catch((err) => {
            if (err)
                throw (0, error_1.createError)(500, "image wasn't uploaded upload");
        });
        const url = `http://${req.headers.host}/uploads/${fileData}/${fileName}`;
        const imageSizeResult = (0, image_size_1.default)(folderPath + "/" + fileName);
        const multiMedia = {
            dir: url,
            format: String(imageSizeResult.type),
            name: fileName,
            dimHeight: String(imageSizeResult.height),
            dimWidth: String(imageSizeResult.width),
        };
        await multiMedia_1.default.create(multiMedia);
        res.status(200).json({ message: "success", url });
    }
    catch (err) {
        next(err);
    }
});
exports.default = router;
//# sourceMappingURL=uploadImage.js.map