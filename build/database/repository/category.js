"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCategoriesWithParent = exports.findCategoriesWithoutParent = exports.findByName = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const category_1 = require("../model/category");
async function findAll() {
    return category_1.CategoryModel.find();
}
exports.findAll = findAll;
async function create(category) {
    const now = new Date();
    category.createdAt = now;
    const createdCategory = await category_1.CategoryModel.create(category);
    return createdCategory;
}
exports.create = create;
async function update(category) {
    category.updatedAt = new Date();
    return category_1.CategoryModel.findByIdAndUpdate(category._id, category, { new: true });
}
exports.update = update;
async function remove(id) {
    return category_1.CategoryModel.findByIdAndRemove(id);
}
exports.remove = remove;
async function findById(id) {
    return category_1.CategoryModel.findById(id);
}
exports.findById = findById;
async function findByName(name) {
    return category_1.CategoryModel.findOne({ name });
}
exports.findByName = findByName;
async function findCategoriesWithoutParent() {
    return category_1.CategoryModel.find({ parent: null });
}
exports.findCategoriesWithoutParent = findCategoriesWithoutParent;
async function findCategoriesWithParent() {
    return category_1.CategoryModel.find({ parent: { $ne: null } });
}
exports.findCategoriesWithParent = findCategoriesWithParent;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
    findByName,
    findCategoriesWithParent,
    findCategoriesWithoutParent,
};
//# sourceMappingURL=category.js.map