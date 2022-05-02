const express = require("express");
const controller = require("./auth.controller");

module.exports = function () {
  const router = express.Router();

  router.post("/signin", controller.signin);
  router.post("/signup", controller.signup);
  router.post("/changePassword", controller.changePassword);

  return router;
};
