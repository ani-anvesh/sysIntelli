var express = require("express");
var app = express();
var chalk = require("chalk");
var figlet = require("figlet");
var fs = require("fs");
var https = require("https");
var http = require("http");
var cors = require("cors");
const cookieSession = require("cookie-session");
authRestrictionService = require("./utils/authJWT");

const DOMAINS = {
  HOME: "192.168.1.245",
  OFFICE: "192.168.1.173",
  LOCAL: "localhost",
};

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
    origin: true,
    credentials: true,
  })
);
app.use(
  cookieSession({
    name: "JWT-session",
    keys: ["COOKIE_SECRET"],
    httpOnly: true,
    domain: DOMAINS.HOME,
    sameSite: "none",
    secure: true,
  })
);

const options = {
  key: fs.readFileSync("./server/openssl/server_office.key"),
  cert: fs.readFileSync("./server/openssl/server_office.crt"),
};

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
  "/api/fetchDoctors",
  authRestrictionService.verifyToken,
  require("./server/routes/fetchDoctors.routes")
);
app.use(
  "/api/fetchShifts",
  authRestrictionService.verifyToken,
  require("./server/routes/fetchShifts.routes")
);
app.use(
  "/api/fetchSlots",
  authRestrictionService.verifyToken,
  require("./server/routes/fetchSlots.routes")
);
app.use("/api/sign", require("./server/routes/sign.routes"));

var server;
if (process.argv.length == 2) {
  server = https.createServer(options, app);
} else {
  server = https.createServer(options, app);
}

// if (process.argv.length == 2) {
//   server = http.createServer(app);
// } else {
//   server = http.createServer(options, app);
// }

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
