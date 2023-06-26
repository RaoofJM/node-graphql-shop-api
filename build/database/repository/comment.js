"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByProduct = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const comment_1 = require("../model/comment");
async function findAll() {
    return comment_1.CommentModel.find()
        .populate("user")
        .populate("product")
        .populate("valueSurveys");
}
exports.findAll = findAll;
async function create(comment) {
    const now = new Date();
    comment.createdAt = now;
    const createdComment = await comment_1.CommentModel.create(comment);
    return createdComment;
}
exports.create = create;
async function update(comment) {
    comment.updatedAt = new Date();
    return comment_1.CommentModel.findByIdAndUpdate(comment._id, comment, { new: true })
        .populate("user")
        .populate("product")
        .populate("valueSurveys");
}
exports.update = update;
async function remove(id) {
    return comment_1.CommentModel.findByIdAndRemove(id)
        .populate("user")
        .populate("product")
        .populate("valueSurveys");
}
exports.remove = remove;
async function findById(id) {
    return comment_1.CommentModel.findById(id)
        .populate("user")
        .populate("product")
        .populate("valueSurveys");
}
exports.findById = findById;
async function findByProduct(productId) {
    return comment_1.CommentModel.find({ product: productId })
        .populate("user")
        .populate("product")
        .populate("valueSurveys");
}
exports.findByProduct = findByProduct;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
    findByProduct,
};
//# sourceMappingURL=comment.js.map