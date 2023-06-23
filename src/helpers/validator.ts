import Joi from "joi";
import { GraphQLFormattedError } from "graphql";
import Logger from "../core/logger";

export function createError(
  message: string,
  code: number,
  customProperties?: Record<string, any>
): GraphQLFormattedError {
  const formattedError: GraphQLFormattedError = {
    message,
    extensions: {
      code,
      ...customProperties,
    },
  };

  return formattedError;
}

export default (schema: Joi.AnySchema, data: any) => {
  const { error } = schema.validate(data);

  if (!error) return true;

  const { details } = error;
  const message = details.map((i) => i.message.replace(/['"]+/g, "")).join(",");
  Logger.error(message);

  const formattedError = createError(message, 401);

  throw formattedError;
};
