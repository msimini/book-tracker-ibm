const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const dbFile = "./database.sqlite";

const insert = async (bookData) => {
  try {
    const db = await sqlite.open({
      filename: dbFile,
      driver: sqlite3.Database,
    });

    await db.run(
      "insert into books (titulo, autor, data_adicionado, status, email) values (?,?,?,?,?)",
      Object.values(bookData)
    );

    await db.close();

    return Promise.resolve({ message: "Book Added!" });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

const update = async (id, email, bookData) => {
  try {
    const db = await sqlite.open({
      filename: dbFile,
      driver: sqlite3.Database,
    });

    await db.run(
      "update books set status = ?, nota = ?, data_leitura = ? where id = ? and email = ?",
      [...Object.values(bookData), id, email]
    );

    await db.close();

    return Promise.resolve({ message: "Book Updated!" });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

const getAllByUser = async (email) => {
  try {
    const db = await sqlite.open({
      filename: dbFile,
      driver: sqlite3.Database,
    });

    const rows = await db.all("select * from books where email = ?", email);

    await db.close();
    return Promise.resolve({ message: rows });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

const remove = async (id, email) => {
  try {
    const db = await sqlite.open({
      filename: dbFile,
      driver: sqlite3.Database,
    });

    await db.run("delete from books where id = ? and email = ?", [id, email]);

    await db.close();

    return Promise.resolve({ message: "Book Deleted!" });
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

module.exports = {
  getAllByUser,
  insert,
  update,
  remove,
};
