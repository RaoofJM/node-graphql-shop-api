import express, { json } from "express";
import "./database"; // initialize database
import "./cache"; // initialize cache
import { port } from "./config/envConfigs";
import Logger from "./core/logger";
import schema from "./graphql";
import { ApolloServer } from "@apollo/server";
const { expressMiddleware } = require("@apollo/server/express4");

process.on('uncaughtException', (e) => {
  Logger.error(e);
});

const app = express();
app.use(json());

export default class Application {
  constructor() {
    this.ServerConfig();
    this.Routes();
  }

  ServerConfig() {
    const server = new ApolloServer({ schema });

    server.start().then(() => {
      app.use(expressMiddleware(server));
    });

    app.listen(port, () => {
      Logger.info(`Server running on port: ${port}`);
    });
  }

  Routes() {}
}
