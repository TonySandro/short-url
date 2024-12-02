import request from "supertest";
import { MysqlHelper } from "../../infra/database/mysql/helper/mysql-helper";
import app from "../config/app";

describe("Api Routes", () => {
  beforeAll(async () => {
    await MysqlHelper.connect();
  });

  afterAll(async () => {
    await MysqlHelper.disconnect();
  });

  afterEach(async () => {
    await MysqlHelper.clear();
  });

  test("Should return an account on success", async () => {
    await request(app)
      .post("/api/user")
      .send({
        name: "Tony",
        email: "tonysduarte@gmail.com",
      })
      .expect(200);
  });
});
