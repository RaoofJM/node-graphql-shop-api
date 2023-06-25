const schema = `
    type Mutation {
        warranty(input: InputWarranty) : operation!
    }

    type Query {
        getAllWarrantys(page: Int, limit: Int): [Warranty]!
    }

    type Warranty {
        _id: ID,
        name: String,
        label: String,
    }

    input InputWarranty {
        name: String!,
        label: String,
    }
`;

export default schema;
