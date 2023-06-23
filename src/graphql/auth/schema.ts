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
`;

export default schema;
