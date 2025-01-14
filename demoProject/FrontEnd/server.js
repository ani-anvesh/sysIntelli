var express = require("express");
var app = express();
var chalk = require("chalk");
var figlet = require("figlet");
var http = require("http");
var cors = require("cors");
const cookieSession = require("cookie-session");
authRestrictionService = require("./utils/authJWT");

var options = {};

const APPLICATION_PORT = 3000;
// const compression = require("compression")
// var cookieParser=require("cookie-parses")

// app.use(compression())
// process.env.baseURL = path.join(__dirname,"./dist")
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limmit: "50mb" }));
// app.use(cookieParser())
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:4200", // Update this with your frontend origin
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "JWT-session",
    keys: ["COOKIE_SECRET"], // should use as secret environment variable
    httpOnly: true,
  })
);
app.options(
  "*",
  cors({
    origin: "http://localhost:4200", // Update this with your frontend origin
    credentials: true,
  })
);

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

app.use(
  "/api/receiptUpload",
  authRestrictionService.verifyToken,
  require("./server/routes/uploadReceipts.routes")
);
app.use(
  "/api/receiptFetch",
  authRestrictionService.verifyToken,
  require("./server/routes/fetchReceipts.routes")
);
app.use(
  "/api/receiptCreate",
  authRestrictionService.verifyToken,
  require("./server/routes/createReceipts.routes")
);
app.use(
  "/api/uploadToS3",
  authRestrictionService.verifyToken,
  require("./server/routes/uploadToS3.routes")
);
app.use("/api/sign", require("./server/routes/sign.routes"));

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
