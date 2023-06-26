import { Types } from "mongoose";
import ValueSurvey, { ValueSurveyModel } from "../model/valueSurvey";

export async function findAll(): Promise<ValueSurvey[]> {
  return ValueSurveyModel.find().populate("survey");
}

export async function create(valueSurvey: ValueSurvey): Promise<ValueSurvey> {
  const now = new Date();
  valueSurvey.createdAt = now;

  const createdValueSurvey = await ValueSurveyModel.create(valueSurvey);
  return createdValueSurvey;
}

export async function update(valueSurvey: ValueSurvey): Promise<ValueSurvey | null> {
  valueSurvey.updatedAt = new Date();
  return ValueSurveyModel.findByIdAndUpdate(valueSurvey._id, valueSurvey, { new: true }).populate("survey");
}

export async function remove(id: Types.ObjectId): Promise<ValueSurvey | null> {
  return ValueSurveyModel.findByIdAndRemove(id).populate("survey");
}

export async function findById(id: Types.ObjectId | string): Promise<ValueSurvey | null> {
  return ValueSurveyModel.findById(id).populate("survey");
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
};
