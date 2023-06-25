"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Mutation {
        seller(input: InputSeller) : operation!
    }

    type Query {
        getAllSellers(category: ID!, page: Int, limit: Int): [Seller]!
    }

    type Seller {
        _id: ID,
        name: String,
        label: String,
        category: Category,
    }

    input InputSeller {
        name: String!,
        label: String,
        category: ID!,
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map