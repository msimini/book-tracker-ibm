const sqlite3 = require("sqlite3");

const db = new sqlite3.Database("./database.sqlite", (error) => {
  if (error) console.log(error);
});

module.exports = () => {
  db.serialize(() => {
    db.run(
      "create table if not exists users (email text primary key not null, name text, password text)",
      (error) => {
        if (error) console.log("error creating users table", error);
      }
    );

    db.run(
      "create table if not exists books (id integer primary key, titulo text, autor text, data_adicionado text, data_leitura text, nota integer, status text, email text not null, FOREIGN KEY (email) REFERENCES users (email))",
      (error) => {
        if (error) console.log(error);
      }
    );

    // db.run('insert into books (titulo, email) values (?, ?)', ['Star Wars', 'mike@starwars.com'], (error) => {
    //     if (error) console.log(error);
    // });

    // db.run('insert into users (email, name, password) values (?,?,?)', ['luke@starwars.com', 'Luke', 'Leia'], (error) => {
    //     if (error) console.log(error);
    // });

    db.all("select * from users", (error, rows) => {
      console.log(error, rows);
    });

    db.all("select * from books", (error, rows) => {
      console.log(error, rows);
    });
  });

  db.close();
};
