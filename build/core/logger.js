"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const envConfigs_1 = require("../config/envConfigs");
let dir = envConfigs_1.logDirectory;
if (!dir)
    dir = path_1.default.resolve("logs");
// create directory if it is not present
if (!fs_1.default.existsSync(dir)) {
    // Create the directory if it does not exist
    fs_1.default.mkdirSync(dir);
}
const logLevel = envConfigs_1.environment === "development" ? "debug" : "warn";
const dailyRotateFile = new winston_daily_rotate_file_1.default({
    // @ts-ignore
    filename: dir + "/%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d",
});
exports.default = (0, winston_1.createLogger)({
    format: winston_1.format.combine(winston_1.format.errors({ stack: true }), winston_1.format.timestamp(), winston_1.format.json()),
    level: logLevel,
    handleExceptions: true,
    transports: [new winston_1.transports.Console(), dailyRotateFile],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false, // do not exit on handled exceptions
});
//# sourceMappingURL=logger.js.map