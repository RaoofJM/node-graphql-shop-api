"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Mutation {
        slider(input: InputSlider) : operation!
    }

    type Query {
        getAllSliders(page: Int, limit: Int): [Slider]!
    }

    type Slider {
        _id: ID,
        name: String,
        label: String,
        default: Boolean,
        images: [MultiMedia]
    }

    input InputSlider {
        name: String!,
        label: String,
        images: [ID]!
        default: Boolean,
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map