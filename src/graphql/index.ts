import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";
import Logger from "../core/logger";

import { authResolver, authTypeDefs } from "./auth";
import { multiMediaResolver, multiMediaTypeDefs } from "./multiMedia";
import { categoryResolver, categoryTypeDefs } from "./category";
import { brandResolver, brandTypeDefs } from "./brand";
import { surveyResolver, surveyTypeDefs } from "./survey";
import { productSpecResolver, productSpecTypeDefs } from "./productSpec";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

export const rootResolvers = merge(
  authResolver,
  multiMediaResolver,
  categoryResolver,
  brandResolver,
  surveyResolver,
  productSpecResolver
);

export const rootTypeDefs = [
  authTypeDefs,
  multiMediaTypeDefs,
  categoryTypeDefs,
  brandTypeDefs,
  surveyTypeDefs,
  productSpecTypeDefs,
];

export default makeExecutableSchema({
  typeDefs: rootTypeDefs,
  resolvers: rootResolvers,
});
