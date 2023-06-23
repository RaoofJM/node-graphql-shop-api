"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const multiMedia_1 = __importDefault(require("../../database/repository/multiMedia"));
const mkdirp_1 = __importDefault(require("mkdirp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("../../helpers/utils");
// This part, works with appolo server version 3. So it might not work right now.
const resolver = {
    Query: {
        getAllMultiMedia: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                try {
                    const page = args.page || 1;
                    const limit = args.limit || 10;
                    const medias = await multiMedia_1.default.findAll();
                    const paginatedMedias = (0, utils_1.paginateArray)(medias, page, limit);
                    return paginatedMedias;
                }
                catch (err) {
                    throw (0, validator_1.createError)("images wasn't loaded", 500);
                }
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
    Mutation: {
        multiMedia: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                try {
                    const { createReadStream, fileName, } = await args.image;
                    const stream = createReadStream();
                    const { filepath } = await saveImage({
                        stream,
                        filename: fileName,
                    });
                    await multiMedia_1.default.create({
                        dir: filepath,
                        name: fileName,
                        format: "jpeg",
                    });
                    return {
                        status: 200,
                        message: "success",
                    };
                }
                catch (err) {
                    throw (0, validator_1.createError)("image wasn't saved", 500);
                }
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
};
const saveImage = ({ stream, filename, }) => {
    const date = new Date();
    let dir = `uploads/${date.getFullYear()}/${date.getMonth() + 1}`;
    mkdirp_1.default.sync(path_1.default.join(__dirname, `/public/${dir}`));
    let filepath = `${dir}/${filename}`;
    if (fs_1.default.existsSync(path_1.default.join(__dirname, `/public/${filepath}`))) {
        filepath = `${dir}/${Date.now()}-${filename}`;
    }
    return new Promise((resolve, reject) => {
        stream
            .pipe(fs_1.default.createWriteStream(path_1.default.join(__dirname, `/public/${filepath}`)))
            .on("error", (error) => reject(error))
            .on("finish", () => {
            resolve({ filepath });
        });
    });
};
exports.default = resolver;
//# sourceMappingURL=resolver.js.map