"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByCategory = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const product_1 = require("../model/product");
async function findAll() {
    return product_1.ProductModel.find().populate([
        "brand",
        "details",
        "attribute",
        "category",
        "mainImage",
        "images",
    ]);
}
exports.findAll = findAll;
async function create(product) {
    const now = new Date();
    product.createdAt = now;
    const createdProduct = await product_1.ProductModel.create(product);
    return createdProduct;
}
exports.create = create;
async function update(product) {
    product.updatedAt = new Date();
    return product_1.ProductModel.findByIdAndUpdate(product._id, product, {
        new: true,
    }).populate([
        "brand",
        "details",
        "attribute",
        "category",
        "mainImage",
        "images",
    ]);
}
exports.update = update;
async function remove(id) {
    return product_1.ProductModel.findByIdAndRemove(id).populate([
        "brand",
        "details",
        "attribute",
        "category",
        "mainImage",
        "images",
    ]);
}
exports.remove = remove;
async function findById(id) {
    return product_1.ProductModel.findById(id).populate([
        "brand",
        "details",
        "attribute",
        "category",
        "mainImage",
        "images",
    ]);
}
exports.findById = findById;
async function findByCategory(categoryId) {
    return product_1.ProductModel.find({ category: categoryId }).populate([
        "brand",
        "details",
        "attribute",
        "category",
        "mainImage",
        "images",
    ]);
}
exports.findByCategory = findByCategory;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
    findByCategory,
};
//# sourceMappingURL=product.js.map