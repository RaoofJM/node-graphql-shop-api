"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByCategory = exports.findByName = exports.findById = exports.remove = exports.update = exports.create = exports.findAll = void 0;
const survey_1 = require("../model/survey");
async function findAll() {
    return survey_1.SurveyModel.find().populate("category");
}
exports.findAll = findAll;
async function create(survey) {
    const now = new Date();
    survey.createdAt = now;
    const createdSurvey = await survey_1.SurveyModel.create(survey);
    return createdSurvey;
}
exports.create = create;
async function update(survey) {
    survey.updatedAt = new Date();
    return survey_1.SurveyModel.findByIdAndUpdate(survey._id, survey, {
        new: true,
    }).populate("category");
}
exports.update = update;
async function remove(id) {
    return survey_1.SurveyModel.findByIdAndRemove(id).populate("category");
}
exports.remove = remove;
async function findById(id) {
    return survey_1.SurveyModel.findById(id).populate("category");
}
exports.findById = findById;
async function findByName(name) {
    return survey_1.SurveyModel.findOne({ name }).populate("category");
}
exports.findByName = findByName;
async function findByCategory(category) {
    return survey_1.SurveyModel.find({ category }).populate("category");
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
//# sourceMappingURL=survey.js.map