"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../../helpers/validator");
const validator_2 = __importDefault(require("../../helpers/validator"));
const joi_1 = __importDefault(require("./joi"));
const user_1 = __importDefault(require("../../database/repository/user"));
const survey_1 = __importDefault(require("../../database/repository/survey"));
const valueSurvey_1 = __importDefault(require("../../database/repository/valueSurvey"));
const product_1 = __importDefault(require("../../database/repository/product"));
const comment_1 = __importDefault(require("../../database/repository/comment"));
const utils_1 = require("../../helpers/utils");
const resolver = {
    Query: {
        getAllComments: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.find, args);
                const page = args.page || 1;
                const limit = args.limit || 10;
                const comments = await comment_1.default.findByProduct(args.product);
                const paginatedComments = (0, utils_1.paginateArray)(comments, page, limit);
                return paginatedComments;
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
    Mutation: {
        comment: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                (0, validator_2.default)(joi_1.default.create, args.input);
                const product = await product_1.default.findById(args.input.product);
                const user = await user_1.default.findById(args.input.user);
                if (!product)
                    throw (0, validator_1.createError)("product is not valid", 401);
                if (!user)
                    throw (0, validator_1.createError)("user is not valid", 401);
                const valueSurveys = await saveValueSurveys(args.input.valueSurveys);
                if (valueSurveys.length === 0)
                    throw (0, validator_1.createError)("value surveys are not valid", 401);
                args.input.valueSurveys = valueSurveys;
                const comment = args.input;
                await comment_1.default.create(comment);
                return {
                    status: 200,
                    message: "succes",
                };
            }
            else {
                throw (0, validator_1.createError)("access denied", 402);
            }
        },
    },
};
async function saveValueSurveys(valueSurveys) {
    try {
        let arr = [];
        for (let index = 0; index < valueSurveys.length; index++) {
            const valueSurvey = valueSurveys[index];
            (0, validator_2.default)(joi_1.default.createValueSurvey, valueSurvey);
            const survey = await survey_1.default.findById(String(valueSurvey.survey));
            if (!survey)
                throw (0, validator_1.createError)("survey is not valid", 401);
            const op = await valueSurvey_1.default.create(valueSurvey);
            arr[index] = op._id;
        }
        return arr;
    }
    catch (err) {
        throw err;
    }
}
exports.default = resolver;
//# sourceMappingURL=resolver.js.map