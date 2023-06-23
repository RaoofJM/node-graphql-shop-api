"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Mutation {
        survey(input: InputSurvey) : operation!
    }

    type Query {
        getAllSurveys(page: Int, limit: Int): [Survey]!
    }

    type Survey {
        _id: ID,
        name: String,
        label: String,
        category: Category,
    }

    input InputSurvey {
        name: String!,
        label: String,
        category: [ID]!,
        image: ID!
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map