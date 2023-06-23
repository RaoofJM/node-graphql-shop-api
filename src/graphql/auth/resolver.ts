import UserRepo from "../../database/repository/user";
import User from "../../database/model/user";
import validator, { createError } from "../../helpers/validator";
import joiSchema from "./joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { tokenInfo } from "../../config/envConfigs";
import { createToken } from "../../helpers/jwt";

const resolver = {
  Mutation: {
    register: async (pararm: any, args: any) => {
      validator(joiSchema.register, args);

      const emailExist = await UserRepo.findByEmail(args.email);
      const phoneExist = await UserRepo.findByPhone(args.phone);
      if (emailExist) throw createError("email is already registered", 401);
      if (phoneExist) throw createError("phone is already registered", 401);

      const user: User = args;
      console.log(user);
      await UserRepo.create(user);

      return {
        status: 200,
        message: "success",
      };
    },
  },
  Query: {
    login: async (params: any, args: any) => {
      validator(joiSchema.login, args);

      const user = await UserRepo.findByPhone(args.phone);
      if (!user) throw createError("user not found", 404);

      const isPasswordCorrect = await bcrypt.compare(
        args.password,
        user.password
      );
      if (!isPasswordCorrect) throw createError("wrong password", 401);

      const token = await createToken({ id: user._id });

      return {
        status: 200,
        message: "success",
        token,
      };
    },
  },
};

export default resolver;
