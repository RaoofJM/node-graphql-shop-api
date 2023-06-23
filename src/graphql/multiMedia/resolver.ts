import { createError } from "../../helpers/validator";
import MultiMediaRepo from "../../database/repository/multiMedia";
import mkdirp from "mkdirp";
import path, { resolve } from "path";
import fs from "fs";
import { paginateArray } from "../../helpers/utils";
import ImageSize from "image-size";

// This part, works with appolo server version 3. So it might not work right now.

const resolver = {
  Query: {
    getAllMultiMedia: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        try {
          const page = args.page || 1;
          const limit = args.limit || 10;
          const medias = await MultiMediaRepo.findAll();
          const paginatedMedias = paginateArray(medias, page, limit);

          for (let index = 0; index < paginatedMedias.length; index++) {
            const media = paginatedMedias[index];
            ImageSize(
              path.join(__dirname, `/public/${media.dir}`),
              async (err, dim) => {
                media.dimWidth = String(dim?.width);
                media.dimHeight = String(dim?.height);
              }
            );
          }

          return paginatedMedias;
        } catch (err) {
          throw createError("images wasn't loaded", 500);
        }
      } else {
        throw createError("access denied", 402);
      }
    },
  },
  Mutation: {
    multiMedia: async (
      params: any,
      args: any,
      { token, levels }: { token: any; levels: string }
    ) => {
      if (token && levels.includes("admin")) {
        try {
          const {
            createReadStream,
            fileName,
          }: { createReadStream: () => fs.ReadStream; fileName: string } =
            await args.image;
          const stream = createReadStream();
          const { filepath }: { filepath: string } = await saveImage({
            stream,
            filename: fileName,
          });

          await MultiMediaRepo.create({
            dir: filepath,
            name: fileName,
            format: "jpeg",
          });

          return {
            status: 200,
            message: "success",
          };
        } catch (err) {
          throw createError("image wasn't saved", 500);
        }
      } else {
        throw createError("access denied", 402);
      }
    },
  },
};

interface SaveImageParams {
  stream: fs.ReadStream;
  filename: string;
}

interface SaveImageResult {
  filepath: string;
}

const saveImage = ({
  stream,
  filename,
}: SaveImageParams): Promise<SaveImageResult> => {
  const date = new Date();
  let dir = `uploads/${date.getFullYear()}/${date.getMonth() + 1}`;

  mkdirp.sync(path.join(__dirname, `/public/${dir}`));

  let filepath = `${dir}/${filename}`;
  if (fs.existsSync(path.join(__dirname, `/public/${filepath}`))) {
    filepath = `${dir}/${Date.now()}-${filename}`;
  }

  return new Promise<SaveImageResult>((resolve, reject) => {
    stream
      .pipe(fs.createWriteStream(path.join(__dirname, `/public/${filepath}`)))
      .on("error", (error: Error) => reject(error))
      .on("finish", () => {
        resolve({ filepath });
      });
  });
};

export default resolver;
