import { Types, Schema, model } from "mongoose";
import Survey, { SurveyModel } from "../model/survey";

export async function findAll(): Promise<Survey[]> {
  return SurveyModel.find().populate("category");
}

export async function create(survey: Survey): Promise<Survey> {
  const now = new Date();
  survey.createdAt = now;

  const createdSurvey = await SurveyModel.create(survey);
  return createdSurvey;
}

export async function update(survey: Survey): Promise<Survey | null> {
  survey.updatedAt = new Date();
  return SurveyModel.findByIdAndUpdate(survey._id, survey, {
    new: true,
  }).populate("category");
}

export async function remove(id: Types.ObjectId): Promise<Survey | null> {
  return SurveyModel.findByIdAndRemove(id).populate("category");
}

export async function findById(
  id: Types.ObjectId | string
): Promise<Survey | null> {
  return SurveyModel.findById(id).populate("category");
}

export async function findByName(name: string): Promise<Survey | null> {
  return SurveyModel.findOne({ name }).populate("category");
}

export async function findByCategory(
  category: Types.ObjectId
): Promise<Survey[]> {
  return SurveyModel.find({ category }).populate("category");
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findByName,
  findByCategory,
};
