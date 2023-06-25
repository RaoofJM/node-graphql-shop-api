"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const productAttribute_1 = require("../model/productAttribute");
async function findAll() {
    return productAttribute_1.ProductAttributeModel.find().populate("seller").populate("warranty");
}
exports.findAll = findAll;
async function create(productAttribute) {
    const now = new Date();
    productAttribute.createdAt = now;
    const createdProductAttribute = await productAttribute_1.ProductAttributeModel.create(productAttribute);
    return createdProductAttribute;
}
exports.create = create;
async function update(productAttribute) {
    productAttribute.updatedAt = new Date();
    return productAttribute_1.ProductAttributeModel.findByIdAndUpdate(productAttribute._id, productAttribute, { new: true })
        .populate("seller")
        .populate("warranty");
}
exports.update = update;
async function remove(id) {
    return productAttribute_1.ProductAttributeModel.findByIdAndRemove(id)
        .populate("seller")
        .populate("warranty");
}
exports.remove = remove;
async function findById(id) {
    return productAttribute_1.ProductAttributeModel.findById(id)
        .populate("seller")
        .populate("warranty");
}
exports.findById = findById;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
};
//# sourceMappingURL=productAttribute.js.map