import mysql from "mysql2/promise";

export const MysqlHelper = {
  async connect() {
    this.connection = mysql.createConnection({
      host: "localhost",
      port: 3307,
      user: "root",
      password: "admintsd",
      database: "short-api",
    });

    (await this.connection)
      .connect()
      .then(() => {
        console.log("Connect to MySql.");
      })
      .catch((error) => {
        console.error("Error connecting to MySQL:", error);
      });
  },

  async disconnect() {
    (await this.connection).end();
  },

  async get(database: string) {
    return await this.connection.execute(`SELECT * FROM `, database);
  },
};
