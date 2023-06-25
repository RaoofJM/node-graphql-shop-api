"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = schema;
//# sourceMappingURL=schema.js.map