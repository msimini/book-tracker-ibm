const fs = require("fs");
const https = require("https");

const configureApp = (app) => {
  const bodyParser = require("body-parser");
  app.use(bodyParser.json());
  const allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE, OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, x-access-token"
    );

    if (req.method === "OPTIONS") {
      res.send(200, "");
    } else {
      next();
    }
  };
  app.use(allowCrossDomain);
};

// const configureFront = (app) => {
//   const express = require('express');
//   const bodyParser = require('body-parser');

//   app.use('/support/spp', express.static('public'));
//   app.use(express.static('public'));

//   app.use('/support/spp/unittest', (req, res, next) => {
//     if (req.user && req.user.role == 'VendorAdmin') {
//       next();
//     } else {
//       res.send('Just for devs!');
//     }
//   });
//   app.use('/support/spp/unittest', express.static('mochawesome-report'));
// };

// const initFront = (app) => {
//   // Front End Routing
//   const front = require('./routes/front');
//   app.use(front);
// };

const configureAuth = (app) => {
  const auth = require("./middleware/authJwt");
  app.use(auth.verifyToken);
};

const initRoutes = (app) => {
  app.get("/api", (req, res) => {
    res.json({ message: "Welcome to Book Tracker." });
  });

  const auth = require("./routes/api/auth");
  app.use("/api/auth", auth());

  configureAuth(app);

  const books = require("./routes/api/books");
  app.use("/api/books", books());
};

const initDataBase = () => {
  const dbconfig = require("./db");
  dbconfig();
};

function runLocalServer(app) {
  const hostname = "localhost";
  const httpsPort = process.env.PORT || 3000;

  const certsOptions = {
    key: fs.readFileSync("./certs/key.pem"),
    cert: fs.readFileSync("./certs/cert.pem"),
  };
  https.createServer(certsOptions, app).listen(httpsPort, () => {
    console.log(
      `Local HTTPS server running at https://${hostname}:${httpsPort} 🚀`
    );
  });
}

const startApp = (app) => {
  runLocalServer(app);
};

const init = (app) => {
  //   configureMonitor(app);
  configureApp(app);
  //   configureAuth(app);
  //   configureFront(app);
  initRoutes(app);
  initDataBase();
  //   initFront(app);
  startApp(app);
};

module.exports = init;
