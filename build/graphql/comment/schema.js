"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Mutation {
        comment(input: InputComment) : operation!
    }

    type Query {
        getAllComments(product: ID!, page: Int, limit: Int): [Comment]!
    }

    type Comment {
        _id: ID,
        title: String,
        description: String,
        negative: [String],
        positive: [String],
        product: Product,
        user: User,
        valueSurveys: [ValueSurvey],
    }

    type ValueSurvey {
        _id: ID,
        survey: Survey,
        value: Int,
    }

    input InputComment {
        title: String!,
        description: String!,
        negative: [String],
        positive: [String],
        product: ID!,
        user: ID!,
        valueSurveys: [InputValueSurvey!]!,
    }

    input InputValueSurvey {
        survey: ID!,
        value: Int!,
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map