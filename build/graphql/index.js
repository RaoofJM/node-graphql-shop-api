"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootTypeDefs = exports.rootResolvers = void 0;
const schema_1 = require("@graphql-tools/schema");
const lodash_1 = require("lodash");
const logger_1 = __importDefault(require("../core/logger"));
const auth_1 = require("./auth");
const multiMedia_1 = require("./multiMedia");
const category_1 = require("./category");
const brand_1 = require("./brand");
const survey_1 = require("./survey");
const productSpec_1 = require("./productSpec");
const productDetail_1 = require("./productDetail");
const seller_1 = require("./seller");
const warranty_1 = require("./warranty");
const slider_1 = require("./slider");
const banner_1 = require("./banner");
process.on("uncaughtException", (e) => {
    logger_1.default.error(e);
});
exports.rootResolvers = (0, lodash_1.merge)(auth_1.authResolver, multiMedia_1.multiMediaResolver, category_1.categoryResolver, brand_1.brandResolver, survey_1.surveyResolver, productSpec_1.productSpecResolver, productDetail_1.productDetailResolver, seller_1.sellerResolver, warranty_1.warrantyResolver, slider_1.sliderResolver, banner_1.bannerResolver);
exports.rootTypeDefs = [
    auth_1.authTypeDefs,
    multiMedia_1.multiMediaTypeDefs,
    category_1.categoryTypeDefs,
    brand_1.brandTypeDefs,
    survey_1.surveyTypeDefs,
    productSpec_1.productSpecTypeDefs,
    productDetail_1.productDetailTypeDefs,
    seller_1.sellerTypeDefs,
    warranty_1.warrantyTypeDefs,
    slider_1.sliderTypeDefs,
    banner_1.bannerTypeDefs,
];
exports.default = (0, schema_1.makeExecutableSchema)({
    typeDefs: exports.rootTypeDefs,
    resolvers: exports.rootResolvers,
});
//# sourceMappingURL=index.js.map