"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByPhone = exports.findByEmail = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const user_1 = require("../model/user");
async function findAll() {
    return user_1.UserModel.find();
}
exports.findAll = findAll;
async function create(user) {
    const now = new Date();
    user.createdAt = now;
    const createdUser = await user_1.UserModel.create(user);
    return createdUser;
}
exports.create = create;
async function update(user) {
    user.updatedAt = new Date();
    return user_1.UserModel.findByIdAndUpdate(user._id, user, { new: true });
}
exports.update = update;
async function remove(id) {
    return user_1.UserModel.findByIdAndRemove(id);
}
exports.remove = remove;
async function findById(id) {
    return user_1.UserModel.findById(id);
}
exports.findById = findById;
async function findByEmail(email) {
    return user_1.UserModel.findOne({ email });
}
exports.findByEmail = findByEmail;
async function findByPhone(phone) {
    return user_1.UserModel.findOne({ phone });
}
exports.findByPhone = findByPhone;
exports.default = {
    create,
    findAll,
    update,
    findByEmail,
    findById,
    remove,
    findByPhone,
};
//# sourceMappingURL=user.js.map