"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const valueSurvey_1 = require("../model/valueSurvey");
async function findAll() {
    return valueSurvey_1.ValueSurveyModel.find().populate("survey");
}
exports.findAll = findAll;
async function create(valueSurvey) {
    const now = new Date();
    valueSurvey.createdAt = now;
    const createdValueSurvey = await valueSurvey_1.ValueSurveyModel.create(valueSurvey);
    return createdValueSurvey;
}
exports.create = create;
async function update(valueSurvey) {
    valueSurvey.updatedAt = new Date();
    return valueSurvey_1.ValueSurveyModel.findByIdAndUpdate(valueSurvey._id, valueSurvey, { new: true }).populate("survey");
}
exports.update = update;
async function remove(id) {
    return valueSurvey_1.ValueSurveyModel.findByIdAndRemove(id).populate("survey");
}
exports.remove = remove;
async function findById(id) {
    return valueSurvey_1.ValueSurveyModel.findById(id).populate("survey");
}
exports.findById = findById;
exports.default = {
    findAll,
    create,
    update,
    remove,
    findById,
};
//# sourceMappingURL=valueSurvey.js.map