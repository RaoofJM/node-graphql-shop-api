"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByCategory = exports.findByName = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const seller_1 = require("../model/seller");
async function findAll() {
    return seller_1.SellerModel.find().populate("category");
}
exports.findAll = findAll;
async function create(seller) {
    const now = new Date();
    seller.createdAt = now;
    const createdSeller = await seller_1.SellerModel.create(seller);
    return createdSeller;
}
exports.create = create;
async function update(seller) {
    seller.updatedAt = new Date();
    return seller_1.SellerModel.findByIdAndUpdate(seller._id, seller, { new: true }).populate("category");
}
exports.update = update;
async function remove(id) {
    return seller_1.SellerModel.findByIdAndRemove(id).populate("category");
}
exports.remove = remove;
async function findById(id) {
    return seller_1.SellerModel.findById(id).populate("category");
}
exports.findById = findById;
async function findByName(name) {
    return seller_1.SellerModel.findOne({ name }).populate("category");
}
exports.findByName = findByName;
async function findByCategory(categoryId) {
    return seller_1.SellerModel.find({ category: categoryId }).populate("category");
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
//# sourceMappingURL=seller.js.map