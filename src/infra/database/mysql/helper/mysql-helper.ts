import mysql from "mysql2/promise";
import { AddUserModel } from "../../../../domain/usecases/add-user";

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

  async add(user: AddUserModel) {
    const query = "INSERT INTO users (name, email) VALUES (?, ?)";

    return (await this.connection)
      .execute(query, [user.name, user.email])
      .then(() => {
        return true;
      });
  },

  async deleteByEmail(email: string) {
    return (await this.connection).execute(
      `DELETE FROM users WHERE email = ?`,
      [email]
    );
  },
};
