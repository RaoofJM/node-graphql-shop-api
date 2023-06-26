import { makeExecutableSchema } from "@graphql-tools/schema";
import { merge } from "lodash";
import Logger from "../core/logger";

import { authResolver, authTypeDefs } from "./auth";
import { multiMediaResolver, multiMediaTypeDefs } from "./multiMedia";
import { categoryResolver, categoryTypeDefs } from "./category";
import { brandResolver, brandTypeDefs } from "./brand";
import { surveyResolver, surveyTypeDefs } from "./survey";
import { productSpecResolver, productSpecTypeDefs } from "./productSpec";
import { productDetailResolver, productDetailTypeDefs } from "./productDetail";
import { sellerResolver, sellerTypeDefs } from "./seller";
import { warrantyResolver, warrantyTypeDefs } from "./warranty";
import { sliderResolver, sliderTypeDefs } from "./slider";
import { bannerResolver, bannerTypeDefs } from "./banner";
import { productResolver, productTypeDefs } from "./product";
import { orderStatusResolver, orderStatusTypeDefs } from "./orderStatus";
import { commentResolver, commentTypeDefs } from "./comment";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

export const rootResolvers = merge(
  authResolver,
  multiMediaResolver,
  categoryResolver,
  brandResolver,
  surveyResolver,
  productSpecResolver,
  productDetailResolver,
  sellerResolver,
  warrantyResolver,
  sliderResolver,
  bannerResolver,
  productResolver,
  orderStatusResolver,
  commentResolver
);

export const rootTypeDefs = [
  authTypeDefs,
  multiMediaTypeDefs,
  categoryTypeDefs,
  brandTypeDefs,
  surveyTypeDefs,
  productSpecTypeDefs,
  productDetailTypeDefs,
  sellerTypeDefs,
  warrantyTypeDefs,
  sliderTypeDefs,
  bannerTypeDefs,
  productTypeDefs,
  orderStatusTypeDefs,
  commentTypeDefs,
];

export default makeExecutableSchema({
  typeDefs: rootTypeDefs,
  resolvers: rootResolvers,
});
