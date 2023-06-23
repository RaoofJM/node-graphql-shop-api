"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Query {
        getAllCategory(page: Int, limit: Int, mainCategory: Boolean, parentCategory: Boolean): [Category]
    }

    type Category {
        _id: ID,
        name: String,
        label: String,
        parent: Parent,
        image: MultiMedia
    }

    type Parent {
        _id: ID,
        name: String,
        label: String,
        parent: Category,
    }

    type Mutation {
        category(input: InputCategory) : operation!
    }

    input InputCategory {
        name: String!,
        label: String,
        parent: ID,
        image: ID!
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map