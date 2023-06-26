"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatusModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "OrderStatus";
exports.COLLECTION_NAME = "orderStatuses";
const schema = new mongoose_1.Schema({
    name: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        trim: true,
    },
    image: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "MultiMedia",
    },
    default: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
});
exports.OrderStatusModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=orderStatus.js.map