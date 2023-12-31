"use strict";
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
(async () => {
    await client.connect();
})();
// If the Node process ends, close the Cache connection
process.on("SIGINT", async () => {
    await client.disconnect();
});
exports.default = client;
//# sourceMappingURL=index.js.map