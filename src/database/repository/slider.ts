import { Types, Schema, model } from "mongoose";
import Slider, { SliderModel } from "../model/slider";

export async function findAll(): Promise<Slider[]> {
  return SliderModel.find().populate("images");
}

export async function create(slider: Slider): Promise<Slider> {
  const now = new Date();
  slider.createdAt = now;

  const createdSlider = await SliderModel.create(slider);
  return createdSlider;
}

export async function update(slider: Slider): Promise<Slider | null> {
  slider.updatedAt = new Date();
  return SliderModel.findByIdAndUpdate(slider._id, slider, {
    new: true,
  }).populate("images");
}

export async function remove(id: Types.ObjectId): Promise<Slider | null> {
  return SliderModel.findByIdAndRemove(id).populate("images");
}

export async function findById(
  id: Types.ObjectId | string
): Promise<Slider | null> {
  return SliderModel.findById(id).populate("images");
}

export async function findByName(name: string): Promise<Slider | null> {
  return SliderModel.findOne({ name }).populate("images");
}

export async function findFirstDefaultSlider(): Promise<Slider | null> {
  return SliderModel.findOne({ default: true }).populate("images");
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findByName,
  findFirstDefaultSlider,
};
