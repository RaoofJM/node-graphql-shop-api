"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const multiMedia_1 = require("../model/multiMedia");
async function findAll() {
    return multiMedia_1.MultiMediaModel.find();
}
exports.findAll = findAll;
async function create(multiMedia) {
    const now = new Date();
    multiMedia.createdAt = now;
    const createdMultiMedia = await multiMedia_1.MultiMediaModel.create(multiMedia);
    return createdMultiMedia;
}
exports.create = create;
async function update(multiMedia) {
    multiMedia.updatedAt = new Date();
    return multiMedia_1.MultiMediaModel.findByIdAndUpdate(multiMedia._id, multiMedia, {
        new: true,
    });
}
exports.update = update;
async function remove(id) {
    return multiMedia_1.MultiMediaModel.findByIdAndRemove(id);
}
exports.remove = remove;
async function findById(id) {
    return multiMedia_1.MultiMediaModel.findById(id);
}
exports.findById = findById;
exports.default = {
    create,
    findAll,
    update,
    findById,
    remove,
};
//# sourceMappingURL=multiMedia.js.map