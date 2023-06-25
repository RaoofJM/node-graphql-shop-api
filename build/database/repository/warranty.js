"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByName = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const warranty_1 = require("../model/warranty");
async function findAll() {
    return warranty_1.WarrantyModel.find();
}
exports.findAll = findAll;
async function create(warranty) {
    const now = new Date();
    warranty.createdAt = now;
    const createdWarranty = await warranty_1.WarrantyModel.create(warranty);
    return createdWarranty;
}
exports.create = create;
async function update(warranty) {
    warranty.updatedAt = new Date();
    return warranty_1.WarrantyModel.findByIdAndUpdate(warranty._id, warranty, { new: true });
}
exports.update = update;
async function remove(id) {
    return warranty_1.WarrantyModel.findByIdAndRemove(id);
}
exports.remove = remove;
async function findById(id) {
    return warranty_1.WarrantyModel.findById(id);
}
exports.findById = findById;
async function findByName(name) {
    return warranty_1.WarrantyModel.findOne({ name });
}
exports.findByName = findByName;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
    findByName,
};
//# sourceMappingURL=warranty.js.map