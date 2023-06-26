import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import UserRepo from "../../database/repository/user";
import SurveyRepo from "../../database/repository/survey";
import ValueSurveyRepo from "../../database/repository/valueSurvey";
import ProductRepo from "../../database/repository/product";
import CommentRepo from "../../database/repository/comment";
import { paginateArray } from "../../helpers/utils";
import Comment from "../../database/model/comment";
import ValueSurvey from "../../database/model/valueSurvey";

const resolver = {
  Query: {
    getAllComments: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.find, args);

        const page = args.page || 1;
        const limit = args.limit || 10;
        const comments = await CommentRepo.findByProduct(args.product);
        const paginatedComments = paginateArray(comments, page, limit);

        return paginatedComments;
      } else {
        throw createError("access denied", 402);
      }
    },
  },
  Mutation: {
    comment: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const product = await ProductRepo.findById(args.input.product);
        const user = await UserRepo.findById(args.input.user);

        if (!product) throw createError("product is not valid", 401);
        if (!user) throw createError("user is not valid", 401);

        const valueSurveys = await saveValueSurveys(args.input.valueSurveys);

        if (valueSurveys.length === 0)
          throw createError("value surveys are not valid", 401);

        args.input.valueSurveys = valueSurveys;

        const comment: Comment = args.input;

        await CommentRepo.create(comment);

        return {
          status: 200,
          message: "succes",
        };
      } else {
        throw createError("access denied", 402);
      }
    },
  },
};

async function saveValueSurveys(valueSurveys: [ValueSurvey]) {
  try {
    let arr = [];
    for (let index = 0; index < valueSurveys.length; index++) {
      const valueSurvey = valueSurveys[index];

      validator(joiSchema.createValueSurvey, valueSurvey);

      const survey = await SurveyRepo.findById(String(valueSurvey.survey));

      if (!survey) throw createError("survey is not valid", 401);

      const op = await ValueSurveyRepo.create(valueSurvey);

      arr[index] = op._id;
    }

    return arr;
  } catch (err) {
    throw err;
  }
}

export default resolver;
