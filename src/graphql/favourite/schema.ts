const schema = `
    type Mutation {
        favourite(input: InputFavourite) : operation!
    }

    type Query {
        getAllFavourites(user: Boolean, page: Int, limit: Int): [Favourite]!
    }

    type Favourite {
        _id: ID,
        product: Product,
        user: User
    }

    input InputFavourite {
        product: ID!,
    }
`;

export default schema;
