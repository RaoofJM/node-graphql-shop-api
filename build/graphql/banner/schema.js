"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Mutation {
        banner(input: InputBanner) : operation!
    }

    type Query {
        getAllBanners(category: ID!, page: Int, limit: Int): [Banner]!
    }

    type Banner {
        _id: ID,
        category: Category,
        image: MultiMedia,
        default: Boolean
    }

    input InputBanner {
        category: ID!,
        image: ID!,
        default: Boolean
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map