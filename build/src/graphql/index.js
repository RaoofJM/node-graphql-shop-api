"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootResolvers = exports.rootTypeDefs = void 0;
const schema_1 = require("@graphql-tools/schema");
const lodash_1 = require("lodash");
const auth_1 = require("./auth");
exports.rootTypeDefs = [auth_1.authTypeDefs];
exports.rootResolvers = (0, lodash_1.merge)(auth_1.authResolver);
exports.default = (0, schema_1.makeExecutableSchema)({
    typeDefs: exports.rootTypeDefs,
    resolvers: exports.rootResolvers,
});
//# sourceMappingURL=index.js.map