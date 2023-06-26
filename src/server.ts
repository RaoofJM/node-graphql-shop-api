import cluster from "cluster";
import os from "os";
import App from "./app";
if (cluster.isMaster) {
  for (let index = 0; index < os.cpus().length; index++) {
    cluster.fork();
  }

  cluster.on("exit", function (worker, code, signal) {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  new App();
}
