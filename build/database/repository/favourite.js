"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByUserAndProduct = exports.findByProduct = exports.findByUser = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const favourite_1 = require("../model/favourite");
async function findAll() {
    return favourite_1.FavouriteModel.find().populate("product").populate("user");
}
exports.findAll = findAll;
async function create(favourite) {
    const now = new Date();
    favourite.createdAt = now;
    const createdFavourite = await favourite_1.FavouriteModel.create(favourite);
    return createdFavourite;
}
exports.create = create;
async function update(favourite) {
    favourite.updatedAt = new Date();
    return favourite_1.FavouriteModel.findByIdAndUpdate(favourite._id, favourite, {
        new: true,
    })
        .populate("product")
        .populate("user");
}
exports.update = update;
async function remove(id) {
    return favourite_1.FavouriteModel.findByIdAndRemove(id)
        .populate("product")
        .populate("user");
}
exports.remove = remove;
async function findById(id) {
    return favourite_1.FavouriteModel.findById(id).populate("product").populate("user");
}
exports.findById = findById;
async function findByUser(userId) {
    return favourite_1.FavouriteModel.find({ user: userId })
        .populate("product")
        .populate("user");
}
exports.findByUser = findByUser;
async function findByProduct(productId) {
    return favourite_1.FavouriteModel.find({ product: productId })
        .populate("product")
        .populate("user");
}
exports.findByProduct = findByProduct;
async function findByUserAndProduct(userId, productId) {
    return favourite_1.FavouriteModel.findOne({ user: userId, product: productId })
        .populate("product")
        .populate("user");
}
exports.findByUserAndProduct = findByUserAndProduct;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
    findByUser,
    findByProduct,
    findByUserAndProduct,
};
//# sourceMappingURL=favourite.js.map