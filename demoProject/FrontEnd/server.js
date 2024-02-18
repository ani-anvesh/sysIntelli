var express = require("express");
var app = express();
var chalk = require("chalk");
var figlet = require("figlet");
var http = require("http");
var https = require("https");

var options = {};

const APPLICATION_PORT = 3000;
// const compression = require("compression")
// var cookieParser=require("cookie-parses")

// app.use(compression())
// process.env.baseURL = path.join(__dirname,"./dist")
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limmit: "50mb" }));
// app.use(cookieParser())

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-methods",
    "POST, GET, OPTIONS, DELETE, PUT"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// app.use(express.static(process.env.baseURL + "/"));

process.on("exit", (code) => {
  console.error("shutting Down with exit code: " + code);
});

app.on("ready", function () {
  process.on("exit", (code) => {
    console.error("Shutting Down with exit code: " + code);
  });

  process.on("uncaughtException", (err) => {
    console.error({
      type: "uncaughtException",
      error: err,
    });
  });

  process.on("unhandledRejection", (reason, promise) => {
    console.error("unhandledRejection");
    if (reason) console.error(reason);
    if (promise) console.error;
  });

  process.on("SIGTERM", function () {
    console.error("SIGTERM");
    server.close(function () {
      console.log("Finished all requests");
    });
  });
});

app.use("api/upload", require("./server/routes/upload.routes"));

var server;
if (process.argv.length == 2) {
  server = http.createServer(options, app);
} else {
  server = http.createServer(app);
}

server.listen(APPLICATION_PORT, () => {
  figlet("Sysintelli", function (err, data) {
    console.log(chalk.green(data));
    console.log(
      chalk.blue("Starting Sysintelli Application: ") + chalk.yellow("Receipt")
    );
    console.log(
      chalk.blue("Applicaton running on port: ") +
        chalk.yellow(APPLICATION_PORT)
    );
  });
});
// });
