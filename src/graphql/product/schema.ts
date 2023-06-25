const schema = `
    type Mutation {
        product(input: InputProduct) : operation!
    }

    type Query {
        getAllBrands(page: Int, limit: Int): [Brand]!
    }

    type Brand {
        _id: ID,
        name: String,
        label: String,
        category: [Category],
        image: MultiMedia
    }

    input InputProduct {
        fname: String!,
        ename: String!,
        category: ID!,
        brand: ID!,
        attribute: [InputAttribute!]!,
        details: [InputDetail!]!,
        description: string,
        mainImage: ID!,
        images: [ID]!
    }

    input InputDetail {
        productDetail: ID!,
        value: String!,
        label: String
    }

    input InputAttribute {
        seller: ID!,
        warranty: ID!,
        color: String!,
        stock: Int!,
        price: Int!,
        discount: Int = 0
    }
`;

export default schema;
