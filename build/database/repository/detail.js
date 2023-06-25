"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const detail_1 = require("../model/detail");
async function findAll() {
    return detail_1.DetailBrandModel.find().populate("productDetail");
}
exports.findAll = findAll;
async function create(detail) {
    const now = new Date();
    detail.createdAt = now;
    const createdDetail = await detail_1.DetailBrandModel.create(detail);
    return createdDetail.populate("productDetail");
}
exports.create = create;
async function update(detail) {
    detail.updatedAt = new Date();
    return detail_1.DetailBrandModel.findByIdAndUpdate(detail._id, detail, {
        new: true,
    }).populate("productDetail");
}
exports.update = update;
async function remove(id) {
    return detail_1.DetailBrandModel.findByIdAndRemove(id).populate("productDetail");
}
exports.remove = remove;
async function findById(id) {
    return detail_1.DetailBrandModel.findById(id).populate("productDetail");
}
exports.findById = findById;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
};
//# sourceMappingURL=detail.js.map