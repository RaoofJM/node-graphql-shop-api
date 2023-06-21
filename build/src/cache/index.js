"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const logger_1 = __importDefault(require("../core/logger"));
const envConfigs_1 = require("../config/envConfigs");
const redisURL = `redis://${envConfigs_1.redis.host}:${envConfigs_1.redis.port}`;
const client = (0, redis_1.createClient)({ url: redisURL });
client.on("connect", () => logger_1.default.info("Cache is connecting"));
client.on("ready", () => logger_1.default.info("Cache is ready"));
client.on("end", () => logger_1.default.info("Cache disconnected"));
client.on("reconnecting", () => logger_1.default.info("Cache is reconnecting"));
client.on("error", (e) => logger_1.default.error(e));
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
}))();
// If the Node process ends, close the Cache connection
process.on("SIGINT", () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.disconnect();
}));
exports.default = client;
//# sourceMappingURL=index.js.map