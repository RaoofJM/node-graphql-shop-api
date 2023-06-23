"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Mutation {
        productSpec(input: InputProductSpec) : operation!
    }

    type Query {
        getAllProductSpecs(category: ID!, page: Int, limit: Int): [ProductSpec]!
    }

    type ProductSpec {
        _id: ID,
        name: String,
        label: String,
        category: Category,
    }

    input InputProductSpec {
        name: String!,
        label: String,
        category: ID!,
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map