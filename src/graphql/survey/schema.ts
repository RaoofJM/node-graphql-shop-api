const schema = `
    type Mutation {
        survey(input: InputSurvey) : operation!
    }

    type Query {
        getAllSurveys(category: ID!, page: Int, limit: Int): [Survey]!
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
        category: ID!,
    }
`;

export default schema;
