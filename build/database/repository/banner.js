"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBannersByCategory = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const banner_1 = require("../model/banner");
async function findAll() {
    return banner_1.BannerModel.find().populate(["category", "image"]);
}
exports.findAll = findAll;
async function create(banner) {
    const now = new Date();
    banner.createdAt = now;
    const createdBanner = await banner_1.BannerModel.create(banner);
    return createdBanner;
}
exports.create = create;
async function update(banner) {
    banner.updatedAt = new Date();
    return banner_1.BannerModel.findByIdAndUpdate(banner._id, banner, {
        new: true,
    }).populate(["category", "image"]);
}
exports.update = update;
async function remove(id) {
    return banner_1.BannerModel.findByIdAndRemove(id).populate(["category", "image"]);
}
exports.remove = remove;
async function findById(id) {
    return banner_1.BannerModel.findById(id).populate(["category", "image"]);
}
exports.findById = findById;
async function findBannersByCategory(categoryId) {
    return banner_1.BannerModel.find({ category: categoryId }).populate([
        "category",
        "image",
    ]);
}
exports.findBannersByCategory = findBannersByCategory;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
    findBannersByCategory,
};
//# sourceMappingURL=banner.js.map