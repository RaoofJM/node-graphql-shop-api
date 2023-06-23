"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Mutation {
        brand(input: InputBrand) : operation!
    }

    type Query {
        getAllBrands(page: Int, limit: Int): [Brand]!
    }

    type Brand {
        _id: ID,
        name: String,
        label: String,
        category: [Category],
        image: MultiMedia
    }

    input InputBrand {
        name: String!,
        label: String,
        category: [ID]!,
        image: ID!
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map