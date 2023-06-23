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
const cors_1 = __importDefault(require("cors"));
const graphql_1 = __importDefault(require("./graphql"));
require("./database"); // initialize database
require("./cache"); // initialize cache
const envConfigs_1 = require("./config/envConfigs");
const logger_1 = __importDefault(require("./core/logger"));
const server_1 = require("@apollo/server");
const jwt_1 = require("./helpers/jwt");
const user_1 = __importDefault(require("./database/repository/user"));
const express4_1 = require("@apollo/server/express4");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const error_1 = require("./routes/middlewares/error");
process.on("uncaughtException", (e) => {
    logger_1.default.error(e);
});
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use((0, cors_1.default)({ origin: envConfigs_1.corsUrl, optionsSuccessStatus: 200 }));
app.use((0, express_fileupload_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "..", "public")));
class Application {
    constructor() {
        this.ServerConfig();
        this.RoutesConfig();
    }
    ServerConfig() {
        const server = new server_1.ApolloServer({
            schema: graphql_1.default,
            formatError(err) {
                let data = err.message.split("Unexpected error value: ")[1];
                data = eval(`(${data})`);
                const message = data ? data.message : err.message;
                const extensions = data ? data.extensions : err.extensions;
                return { message, extensions };
            },
        });
        server.start().then(() => {
            app.use((0, express4_1.expressMiddleware)(server, {
                context: async ({ req }) => {
                    const token = (await (0, jwt_1.verifyToken)(req.headers.token));
                    let user;
                    let levels;
                    if (token) {
                        user = await user_1.default.findById(token.id);
                        levels = user?.levels;
                    }
                    return { token, levels };
                },
            }));
        });
        app.listen(envConfigs_1.port, () => {
            logger_1.default.info(`Server running on port: ${envConfigs_1.port}`);
        });
    }
    RoutesConfig() {
        app.use(routes_1.default);
        app.use(error_1.errorHandler);
    }
}
exports.default = Application;
//# sourceMappingURL=app.js.map