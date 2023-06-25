const schema = `
    type Mutation {
        productDetail(input: InputProductDetail) : operation!
    }

    type Query {
        getAllProductDetails(page: Int, limit: Int): [ProductDetail]!
    }

    type ProductDetail {
        _id: ID,
        name: String,
        label: String,
        spec: ProductSpec,
    }

    input InputProductDetail {
        name: String!,
        label: String,
        spec: [ID]!,
    }
`;

export default schema;
