"use strict";

const model = require("./books.model");

const getAll = (req, res) => {
  model
    .getAllByUser(req.email)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
};

const insertBook = (req, res) => {
  if (!req.body.titulo || !req.body.autor)
    return res.status(400).send("Missing Parameters");

  const bookData = {
    titulo: req.body.titulo,
    autor: req.body.autor,
    data_adicionado: new Date().toISOString().slice(0, 10),
    status: "quero ler",
    email: req.email,
  };

  model
    .insert(bookData)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
};

const updateBook = (req, res) => {
  if (!req.body.status) return res.status(400).send("Missing Parameters");

  if (req.body.status == "lido" && !req.body.nota && !req.body.data_leitura)
    return res
      .status(400)
      .send(
        "Missing Parameters: Nota, Reading Date are required for the status Lido"
      );

  const bookData = {
    status: req.body.status,
    nota: req.body.nota || null,
    data_leitura: req.body.data_leitura || null,
  };

  model
    .update(req.params.id, req.email, bookData)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
};

const deleteBook = (req, res) => {
  model
    .remove(req.params.id, req.email)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  getAll,
  insertBook,
  updateBook,
  deleteBook,
};
