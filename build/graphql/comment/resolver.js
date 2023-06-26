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
        commentManagement: async (params, args, { token, levels }) => {
            if (token && levels.includes("admin")) {
                if (!args.approve && !args.like && !args.dislike)
                    throw (0, validator_1.createError)("comment id is requried", 500);
                if (args.approve) {
                    const comment = await comment_1.default.findById(args.approve);
                    if (!comment)
                        throw (0, validator_1.createError)("comment not found", 404);
                    comment.check = !comment.check;
                    const result = await comment_1.default.update(comment);
                    if (!result)
                        throw (0, validator_1.createError)("comment wasn't saved", 500);
                    return {
                        status: 200,
                        message: "comment approved",
                    };
                }
                else if (args.like) {
                    const comment = await comment_1.default.findById(args.like);
                    if (!comment)
                        throw (0, validator_1.createError)("comment not found", 404);
                    let hasDisliked = false;
                    if (comment.dislike) {
                        comment.dislike.map((item) => {
                            if (item == token.id) {
                                hasDisliked = true;
                            }
                        });
                    }
                    if (hasDisliked) {
                        const index = comment.dislike.indexOf(token.id);
                        if (index > -1)
                            comment.dislike.splice(index, 1);
                    }
                    let hasLiked = false;
                    comment.like.map((item) => {
                        if (item == token.id) {
                            hasLiked = true;
                        }
                    });
                    if (hasLiked) {
                        throw (0, validator_1.createError)("you already have liked this comment", 402);
                    }
                    else {
                        comment.like.push(token.id);
                    }
                    const result = await comment_1.default.update(comment);
                    if (!result)
                        throw (0, validator_1.createError)("comment wasn't saved", 500);
                    return {
                        status: 200,
                        message: "comment liked",
                    };
                }
                else if (args.dislike) {
                    const comment = await comment_1.default.findById(args.dislike);
                    if (!comment)
                        throw (0, validator_1.createError)("comment not found", 404);
                    let hasLiked = false;
                    if (comment.like) {
                        comment.like.map((item) => {
                            if (item == token.id) {
                                hasLiked = true;
                            }
                        });
                    }
                    if (hasLiked) {
                        const index = comment.like.indexOf(token.id);
                        console.log(index);
                        if (index > -1)
                            comment.like.splice(index, 1);
                    }
                    let hasDisliked = false;
                    comment.dislike.map((item) => {
                        if (item == token.id) {
                            hasDisliked = true;
                        }
                    });
                    if (hasDisliked) {
                        throw (0, validator_1.createError)("you already have disliked this comment", 402);
                    }
                    else {
                        comment.dislike.push(token.id);
                    }
                    const result = await comment_1.default.update(comment);
                    if (!result)
                        throw (0, validator_1.createError)("comment wasn't saved", 500);
                    return {
                        status: 200,
                        message: "comment disliked",
                    };
                }
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