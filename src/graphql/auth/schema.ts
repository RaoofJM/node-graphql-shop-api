const schema = `
    type Query {
        user : String
    }

    type Mutation {
        register(phone : String!, passsword : String!) : opration!
    }

    type opration {
        status : Int,
        message : String
    }
`;

export default schema;
