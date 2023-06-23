import express, { NextFunction, Request, Response, json } from "express";
import cors from "cors";
import schema from "./graphql";
import "./database"; // initialize database
import "./cache"; // initialize cache
import { corsUrl, port } from "./config/envConfigs";
import Logger from "./core/logger";
import { ApolloServer } from "@apollo/server";
import { verifyToken } from "./helpers/jwt";
import UserRepo from "./database/repository/user";
import { expressMiddleware } from "@apollo/server/express4";
import fileUpload from "express-fileupload";
import router from "./routes";
import path from "path";
import { errorHandler } from "./routes/middlewares/error";

process.on("uncaughtException", (e) => {
  Logger.error(e);
});

const app = express();
app.use(json());
app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
app.use(fileUpload());
app.use(express.static(path.join(__dirname, "..", "public")));

export default class Application {
  constructor() {
    this.ServerConfig();
    this.RoutesConfig();
  }

  ServerConfig() {
    interface Context {
      token?: String;
    }

    const server = new ApolloServer<Context>({
      schema,
      formatError(err) {
        let data = err.message.split("Unexpected error value: ")[1] as any;
        data = eval(`(${data})`);
        const message = data ? data.message : err.message;
        const extensions = data ? data.extensions : err.extensions;

        return { message, extensions };
      },
    });

    server.start().then(() => {
      app.use(
        expressMiddleware(server, {
          context: async ({ req }: any) => {
            const token = (await verifyToken(req.headers.token)) as any;

            let user;
            let levels;
            if (token) {
              user = await UserRepo.findById(token.id);
              levels = user?.levels;
            }

            return { token, levels };
          },
        })
      );
    });

    app.listen(port, () => {
      Logger.info(`Server running on port: ${port}`);
    });
  }

  RoutesConfig() {
    app.use(router);
    app.use(errorHandler);
  }
}
