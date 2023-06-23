"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByCategory = exports.findByName = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const productSpec_1 = require("../model/productSpec");
async function findAll() {
    return productSpec_1.ProductSpecModel.find().populate("category");
}
exports.findAll = findAll;
async function create(productSpec) {
    const now = new Date();
    productSpec.createdAt = now;
    const createdProductSpec = await productSpec_1.ProductSpecModel.create(productSpec);
    return createdProductSpec;
}
exports.create = create;
async function update(productSpec) {
    productSpec.updatedAt = new Date();
    return productSpec_1.ProductSpecModel.findByIdAndUpdate(productSpec._id, productSpec, {
        new: true,
    }).populate("category");
}
exports.update = update;
async function remove(id) {
    return productSpec_1.ProductSpecModel.findByIdAndRemove(id).populate("category");
}
exports.remove = remove;
async function findById(id) {
    return productSpec_1.ProductSpecModel.findById(id).populate("category");
}
exports.findById = findById;
async function findByName(name) {
    return productSpec_1.ProductSpecModel.findOne({ name }).populate("category");
}
exports.findByName = findByName;
async function findByCategory(category) {
    return productSpec_1.ProductSpecModel.find({ category }).populate("category");
}
exports.findByCategory = findByCategory;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
    findByName,
    findByCategory,
};
//# sourceMappingURL=productSpec.js.map