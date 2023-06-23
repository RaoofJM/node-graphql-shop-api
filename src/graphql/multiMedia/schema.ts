const schema = `
    scalar Upload

    type Query {
        getAllMultiMedia(page : Int, limit : Int) : [MultiMedia]
    }

    type Mutation {
        multiMedia(image : Upload!) : operation!,
    }

    type MultiMedia {
        _id: ID,
        name: String,
        dimWidth: String,
        dimHeight: String,
        format: String,
        dir: String
    }
`;

export default schema;
