"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findDefaultOrderStatus = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const orderStatus_1 = require("../model/orderStatus");
async function findAll() {
    return orderStatus_1.OrderStatusModel.find().populate("image");
}
exports.findAll = findAll;
async function create(orderStatus) {
    const now = new Date();
    orderStatus.createdAt = now;
    const createdOrderStatus = await orderStatus_1.OrderStatusModel.create(orderStatus);
    return createdOrderStatus;
}
exports.create = create;
async function update(orderStatus) {
    orderStatus.updatedAt = new Date();
    return orderStatus_1.OrderStatusModel.findByIdAndUpdate(orderStatus._id, orderStatus, {
        new: true,
    }).populate("image");
}
exports.update = update;
async function remove(id) {
    return orderStatus_1.OrderStatusModel.findByIdAndRemove(id).populate("image");
}
exports.remove = remove;
async function findById(id) {
    return orderStatus_1.OrderStatusModel.findById(id).populate("image");
}
exports.findById = findById;
async function findDefaultOrderStatus() {
    return orderStatus_1.OrderStatusModel.findOne({ default: true }).populate("image");
}
exports.findDefaultOrderStatus = findDefaultOrderStatus;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
    findDefaultOrderStatus,
};
//# sourceMappingURL=orderStatus.js.map