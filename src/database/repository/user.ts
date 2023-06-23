import { Types } from "mongoose";
import User, { UserModel } from "../model/user";

export async function findAll(): Promise<User[]> {
  return UserModel.find();
}

export async function create(user: User): Promise<User> {
  const now = new Date();
  user.createdAt = now;

  const createdUser = await UserModel.create(user);
  return createdUser;
}

export async function update(user: User): Promise<User | null> {
  user.updatedAt = new Date();
  return UserModel.findByIdAndUpdate(user._id, user, { new: true });
}

export async function remove(id: Types.ObjectId): Promise<User | null> {
  return UserModel.findByIdAndRemove(id);
}

export async function findById(
  id: Types.ObjectId | string
): Promise<User | null> {
  return UserModel.findById(id);
}

export async function findByEmail(email: string): Promise<User | null> {
  return UserModel.findOne({ email });
}

export async function findByPhone(phone: string): Promise<User | null> {
  return UserModel.findOne({ phone });
}

export default {
  create,
  findAll,
  update,
  findByEmail,
  findById,
  remove,
  findByPhone,
};
