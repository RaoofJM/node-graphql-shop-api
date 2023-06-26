"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Mutation {
        product(input: InputProduct) : operation!
    }

    type Query {
        getAllProducts(page: Int, limit: Int): [Product]!
    }

    type Product {
        _id: ID,
        fname: String,
        ename: String,
        category: Category,
        brand: Brand,
        attribute: [Attribute],
        details: [Detail],
        description: String,
        mainImage: MultiMedia,
        images: [MultiMedia]
    }

    type Attribute {
        _id: ID,
        seller: Seller,
        warranty: Warranty,
        color: String,
        stock: Int,
        price: Int,
        discount: Int
    }

    type Detail {
        _id: ID,
        productDetail: ProductDetail,
        value: String,
        label: String
    }

    input InputProduct {
        fname: String!,
        ename: String!,
        category: ID!,
        brand: ID!,
        attribute: [InputAttribute!]!,
        details: [InputDetail!]!,
        description: String,
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
exports.default = schema;
//# sourceMappingURL=schema.js.map