import Survey from "../../database/model/survey";
import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import SurveyRepo from "../../database/repository/survey";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllSurveys: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      validator(joiSchema.find, args);

      const page = args.page || 1;
      const limit = args.limit || 10;
      const surveys = await SurveyRepo.findByCategory(args.category);
      if (!surveys) throw createError("not found", 404);
      const paginatedSurveys = paginateArray(surveys, page, limit);

      return paginatedSurveys;
    },
  },
  Mutation: {
    survey: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const survey: Survey = args.input;
        const result = await SurveyRepo.create(survey);
        if (!result) throw createError("survey wasn't saved", 500);

        return {
          status: 200,
          message: "success",
        };
      } else {
        throw createError("access denied", 402);
      }
    },
  },
};

export default resolver;
