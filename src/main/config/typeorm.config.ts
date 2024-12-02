import { DataSource } from "typeorm";
import { UserModel } from "../../domain/models/user";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3307,
  username: "root",
  password: "admintsd",
  database: "short-api",
  synchronize: true,
  logging: false,
  entities: [UserModel],
});
