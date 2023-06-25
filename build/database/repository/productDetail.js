"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByName = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const productDetail_1 = require("../model/productDetail");
async function findAll() {
    return productDetail_1.ProductDetailModel.find().populate("spec");
}
exports.findAll = findAll;
async function create(productDetail) {
    const now = new Date();
    productDetail.createdAt = now;
    const createdProductDetail = await productDetail_1.ProductDetailModel.create(productDetail);
    return createdProductDetail;
}
exports.create = create;
async function update(productDetail) {
    productDetail.updatedAt = new Date();
    return productDetail_1.ProductDetailModel.findByIdAndUpdate(productDetail._id, productDetail, { new: true }).populate("spec");
}
exports.update = update;
async function remove(id) {
    return productDetail_1.ProductDetailModel.findByIdAndRemove(id).populate("spec");
}
exports.remove = remove;
async function findById(id) {
    return productDetail_1.ProductDetailModel.findById(id).populate("spec");
}
exports.findById = findById;
async function findByName(name) {
    return productDetail_1.ProductDetailModel.findOne({ name }).populate("spec");
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
//# sourceMappingURL=productDetail.js.map