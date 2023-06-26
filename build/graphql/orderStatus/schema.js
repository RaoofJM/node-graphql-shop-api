"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Mutation {
        orderStatus(input: InputOrderStatus) : operation!
    }

    type Query {
        getAllOrderStatus(page: Int, limit: Int): [OrderStatus]!
    }

    type OrderStatus {
        _id: ID,
        name: String,
        image: MultiMedia,
        default: Boolean
    }

    input InputOrderStatus {
        name: String!,
        image: ID!,
        default: Boolean
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map