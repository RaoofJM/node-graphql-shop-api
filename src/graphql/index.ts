import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";

import { authResolver, authTypeDefs } from "./auth";

export const rootTypeDefs = [authTypeDefs];

export const rootResolvers = merge(authResolver);

export default makeExecutableSchema({
  typeDefs: rootTypeDefs,
  resolvers: rootResolvers,
});
