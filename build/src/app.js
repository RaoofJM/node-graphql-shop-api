"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
require("./database"); // initialize database
require("./cache"); // initialize cache
const envConfigs_1 = require("./config/envConfigs");
const logger_1 = __importDefault(require("./core/logger"));
const graphql_1 = __importDefault(require("./graphql"));
const server_1 = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const app = (0, express_1.default)();
app.use((0, express_1.json)());
class Application {
    constructor() {
        this.ServerConfig();
        this.Routes();
    }
    ServerConfig() {
        const server = new server_1.ApolloServer({ schema: graphql_1.default });
        server.start().then(() => {
            app.use(expressMiddleware(server));
        });
        app.listen(envConfigs_1.port, () => {
            logger_1.default.info(`Server running on port: ${envConfigs_1.port}`);
        });
    }
    Routes() { }
}
exports.default = Application;
//# sourceMappingURL=app.js.map