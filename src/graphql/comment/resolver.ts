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

    commentManagement: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        if (!args.approve && !args.like && !args.dislike)
          throw createError("comment id is requried", 500);

        if (args.approve) {
          const comment = await CommentRepo.findById(args.approve);
          if (!comment) throw createError("comment not found", 404);

          comment.check = !comment.check;
          const result = await CommentRepo.update(comment);
          if (!result) throw createError("comment wasn't saved", 500);
          return {
            status: 200,
            message: "comment approved",
          };
        } else if (args.like) {
          const comment = await CommentRepo.findById(args.like);
          if (!comment) throw createError("comment not found", 404);

          let hasDisliked: boolean = false;
          if (comment.dislike) {
            comment.dislike.map((item) => {
              if (item == token.id) {
                hasDisliked = true;
              }
            });
          }

          if (hasDisliked) {
            const index = comment.dislike.indexOf(token.id);
            if (index > -1) comment.dislike.splice(index, 1);
          }

          let hasLiked: boolean = false;
          comment.like.map((item) => {
            if (item == token.id) {
              hasLiked = true;
            }
          });

          if (hasLiked) {
            throw createError("you already have liked this comment", 402);
          } else {
            comment.like.push(token.id);
          }

          const result = await CommentRepo.update(comment);
          if (!result) throw createError("comment wasn't saved", 500);
          return {
            status: 200,
            message: "comment liked",
          };
        } else if (args.dislike) {
          const comment = await CommentRepo.findById(args.dislike);
          if (!comment) throw createError("comment not found", 404);

          let hasLiked: boolean = false;
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
            if (index > -1) comment.like.splice(index, 1);
          }

          let hasDisliked: boolean = false;
          comment.dislike.map((item) => {
            if (item == token.id) {
              hasDisliked = true;
            }
          });

          if (hasDisliked) {
            throw createError("you already have disliked this comment", 402);
          } else {
            comment.dislike.push(token.id);
          }

          const result = await CommentRepo.update(comment);
          if (!result) throw createError("comment wasn't saved", 500);
          return {
            status: 200,
            message: "comment disliked",
          };
        }
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
