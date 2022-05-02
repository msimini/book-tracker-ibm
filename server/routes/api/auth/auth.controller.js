const config = require("../../../config/auth.config");

const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const dbFile = "./database.sqlite";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.changePassword = async (req, res) => {
  const db = await sqlite.open({ filename: dbFile, driver: sqlite3.Database });
  let user = db.get(
    "SELECT email, name, password FROM Users Where email = ?",
    req.body.email
  );
  await db.close();
  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }
  let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }
  let update = db.prepare("UPDATE Users SET password = ? WHERE email = ?");
  update.run(bcrypt.hashSync(req.body.newPassword, 8), req.body.email);
  res.status(200).send({
    email: user.email,
    message: "Update Success",
  });
};

exports.signup = async (req, res) => {
  const db = await sqlite.open({ filename: dbFile, driver: sqlite3.Database });
  let user = await db.get(
    "SELECT email, name, password FROM users Where email = ?",
    req.body.email
  );
  if (!user) {
    await db.run("INSERT INTO Users (email, name, password) VALUES (?, ?, ?)", [
      req.body.email,
      req.body.name,
      bcrypt.hashSync(req.body.password, 8),
    ]);

    res.status(200).send({
      message: "Sign up Success",
    });
  } else {
    return res.status(401).send({
      message: "This account already exists!",
    });
  }
  await db.close();
};

exports.signin = async (req, res) => {
  const db = await sqlite.open({ filename: dbFile, driver: sqlite3.Database });
  let user = await db.get(
    "SELECT email, name, password FROM users Where email = ?",
    req.body.email
  );

  if (!user) {
    return res.status(404).send({ message: "User Not found." });
  }

  let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({
      accessToken: null,
      message: "Invalid Password!",
    });
  }

  let token = jwt.sign(
    { username: user.name, email: req.body.email, password: req.body.password },
    config.secret,
    {
      expiresIn: 86400, // 24 hours
    }
  );
  res.status(200).send({
    token: token,
  });
  await db.close();
};
