"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const app_1 = __importDefault(require("./app"));
if (cluster_1.default.isMaster) {
    for (let index = 0; index < os_1.default.cpus().length; index++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on("exit", function (worker, code, signal) {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    new app_1.default();
}
//# sourceMappingURL=server.js.map