"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFirstDefaultSlider = exports.findByName = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const slider_1 = require("../model/slider");
async function findAll() {
    return slider_1.SliderModel.find().populate("images");
}
exports.findAll = findAll;
async function create(slider) {
    const now = new Date();
    slider.createdAt = now;
    const createdSlider = await slider_1.SliderModel.create(slider);
    return createdSlider;
}
exports.create = create;
async function update(slider) {
    slider.updatedAt = new Date();
    return slider_1.SliderModel.findByIdAndUpdate(slider._id, slider, {
        new: true,
    }).populate("images");
}
exports.update = update;
async function remove(id) {
    return slider_1.SliderModel.findByIdAndRemove(id).populate("images");
}
exports.remove = remove;
async function findById(id) {
    return slider_1.SliderModel.findById(id).populate("images");
}
exports.findById = findById;
async function findByName(name) {
    return slider_1.SliderModel.findOne({ name }).populate("images");
}
exports.findByName = findByName;
async function findFirstDefaultSlider() {
    return slider_1.SliderModel.findOne({ default: true }).populate("images");
}
exports.findFirstDefaultSlider = findFirstDefaultSlider;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
    findByName,
    findFirstDefaultSlider,
};
//# sourceMappingURL=slider.js.map