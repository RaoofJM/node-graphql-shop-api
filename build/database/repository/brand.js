"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findBrandsWithCategory = exports.findBrandsWithoutCategory = exports.findByName = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const brand_1 = require("../model/brand");
async function findAll() {
    return brand_1.BrandModel.find().populate("category image");
}
exports.findAll = findAll;
async function create(brand) {
    const now = new Date();
    brand.createdAt = now;
    const createdBrand = await brand_1.BrandModel.create(brand);
    return createdBrand;
}
exports.create = create;
async function update(brand) {
    brand.updatedAt = new Date();
    return brand_1.BrandModel.findByIdAndUpdate(brand._id, brand, { new: true }).populate(["category", "image"]);
}
exports.update = update;
async function remove(id) {
    return brand_1.BrandModel.findByIdAndRemove(id).populate(["category", "image"]);
}
exports.remove = remove;
async function findById(id) {
    return brand_1.BrandModel.findById(id).populate("category image");
}
exports.findById = findById;
async function findByName(name) {
    return brand_1.BrandModel.findOne({ name }).populate(["category", "image"]);
}
exports.findByName = findByName;
async function findBrandsWithoutCategory() {
    return brand_1.BrandModel.find({ category: null }).populate(["category", "image"]);
}
exports.findBrandsWithoutCategory = findBrandsWithoutCategory;
async function findBrandsWithCategory() {
    return brand_1.BrandModel.find({ category: { $ne: null } }).populate([
        "category",
        "image",
    ]);
}
exports.findBrandsWithCategory = findBrandsWithCategory;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
    findByName,
    findBrandsWithoutCategory,
    findBrandsWithCategory,
};
//# sourceMappingURL=brand.js.map