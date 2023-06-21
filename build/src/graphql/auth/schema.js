"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schema = `
    type Mutation {
        register(phone : String!, passsword : String!) : opration!
    }

    type opration {
        status : Int,
        message : String
    }
`;
exports.default = schema;
//# sourceMappingURL=schema.js.map