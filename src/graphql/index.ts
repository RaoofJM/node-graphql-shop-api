import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";
import Logger from "../core/logger";

import { authResolver, authTypeDefs } from "./auth";
import { multiMediaResolver, multiMediaTypeDefs } from "./multiMedia";
import { categoryResolver, categoryTypeDefs } from "./category";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

export const rootResolvers = merge(
  authResolver,
  multiMediaResolver,
  categoryResolver
);

export const rootTypeDefs = [
  authTypeDefs,
  multiMediaTypeDefs,
  categoryTypeDefs,
];

export default makeExecutableSchema({
  typeDefs: rootTypeDefs,
  resolvers: rootResolvers,
});
