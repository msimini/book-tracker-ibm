const express = require("express");

const controller = require("./books.controller");

module.exports = (middlewares) => {
  const router = express.Router();

  if (middlewares) {
    middlewares.forEach((middleware) => router.use(middleware));
  }

  router.get("/", controller.getAll);
  router.post("/insert", controller.insertBook);
  router.post("/update/:id", controller.updateBook);
  router.post("/delete/:id", controller.deleteBook);

  return router;
};
