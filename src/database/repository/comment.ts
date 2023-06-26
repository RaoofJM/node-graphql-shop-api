import { Types } from "mongoose";
import Comment, { CommentModel } from "../model/comment";

export async function findAll(): Promise<Comment[]> {
  return CommentModel.find()
    .populate("user")
    .populate("product")
    .populate("valueSurveys");
}

export async function create(comment: Comment): Promise<Comment> {
  const now = new Date();
  comment.createdAt = now;

  const createdComment = await CommentModel.create(comment);
  return createdComment;
}

export async function update(comment: Comment): Promise<Comment | null> {
  comment.updatedAt = new Date();
  return CommentModel.findByIdAndUpdate(comment._id, comment, { new: true })
    .populate("user")
    .populate("product")
    .populate("valueSurveys");
}

export async function remove(id: Types.ObjectId): Promise<Comment | null> {
  return CommentModel.findByIdAndRemove(id)
    .populate("user")
    .populate("product")
    .populate("valueSurveys");
}

export async function findById(id: Types.ObjectId | string): Promise<Comment | null> {
  return CommentModel.findById(id)
    .populate("user")
    .populate("product")
    .populate("valueSurveys");
}

export async function findByProduct(productId: Types.ObjectId | string): Promise<Comment[]> {
  return CommentModel.find({ product: productId })
    .populate("user")
    .populate("product")
    .populate("valueSurveys");
}

export default {
  findAll,
  create,
  update,
  remove,
  findById,
  findByProduct,
};