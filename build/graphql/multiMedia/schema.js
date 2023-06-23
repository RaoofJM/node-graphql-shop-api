"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    scalar Upload

    type Query {
        getAllMultiMedia(page : Int, limit : Int) : [MultiMedia]
    }

    type Mutation {
        multiMedia(image : Upload!) : operation!,
    }

    type MultiMedia {
        name: String,
        dimWidth: String,
        dimHeight: String,
        format: String,
        dir: String
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map