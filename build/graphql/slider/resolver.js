"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const validator_2 = __importDefault(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const slider_1 = __importDefault(require("../../database/repository/slider"));
const utils_1 = require("../../helpers/utils");
const resolver = {
    Query: {
        getAllSliders: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                const page = args.page || 1;
                const limit = args.limit || 10;
                const sliders = await slider_1.default.findAll();
                const paginatedSliders = (0, utils_1.paginateArray)(sliders, page, limit);
                return paginatedSliders;
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
    Mutation: {
        slider: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.create, args.input);
                const slider = args.input;
                if (args.input.default) {
                    const defaultSlider = await slider_1.default.findFirstDefaultSlider();
                    if (defaultSlider) {
                        defaultSlider.default = false;
                        await slider_1.default.update(defaultSlider);
                    }
                    slider.default = true;
                }
                const result = await slider_1.default.create(slider);
                if (!result)
                    throw (0, validator_1.createError)("slider wasn't saved", 500);
                return {
                    status: 200,
                    message: "success",
                };
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
};
exports.default = resolver;
//# sourceMappingURL=resolver.js.map