import Slider from "../../database/model/slider";
import { createError } from "../../helpers/validator";
import validator from "../../helpers/validator";
import joiSchema from "./joi";
import SliderRepo from "../../database/repository/slider";
import { paginateArray } from "../../helpers/utils";

const resolver = {
  Query: {
    getAllSliders: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        const page = args.page || 1;
        const limit = args.limit || 10;
        const sliders = await SliderRepo.findAll();
        const paginatedSliders = paginateArray(sliders, page, limit);

        return paginatedSliders;
      } else {
        throw createError("access denied", 402);
      }
    },
  },
  Mutation: {
    slider: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        validator(joiSchema.create, args.input);

        const slider: Slider = args.input;

        if (args.input.default) {
          const defaultSlider = await SliderRepo.findFirstDefaultSlider();
          if (defaultSlider) {
            defaultSlider.default = false;
            await SliderRepo.update(defaultSlider);
          }
          slider.default = true;
        }

        const result = await SliderRepo.create(slider);
        if (!result) throw createError("slider wasn't saved", 500);

        return {
          status: 200,
          message: "success",
        };
      } else {
        throw createError("access denied", 402);
      }
    },
  },
};

export default resolver;
