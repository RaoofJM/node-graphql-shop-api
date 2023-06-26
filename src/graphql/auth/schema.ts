const schema = `
    type Query {
        login(phone: String!, password: String!): operation!
    }

    type Mutation {
        register(fullname: String! ,password : String!, confirmPassword : String!, email: String! ,phone : String!) : operation!
    }

    type operation {
        status: Int
        message : String
        token: String
    }

    type User {
        _id: ID,
        fullname: String,
        phone: String,
        levels: [String],
        password: String,
        isEmailVerified: Boolean
    }
`;

export default schema;
