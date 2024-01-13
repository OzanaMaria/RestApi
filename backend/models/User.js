const db = require("../config/db");

class User {
  constructor(email) {
    this.email = email;
  }

  save() {
    let sql = `
        INSERT INTO users(
            email
        )
        VALUES(
            '${this.email}'
        )
        `;

    return db.execute(sql);
  }

  static findAll() {
    let sql = `SELECT * FROM users;`;
    console.log("db");
    return db.execute(sql);
  }
}

module.exports = User;
