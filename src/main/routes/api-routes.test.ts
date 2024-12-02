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
    await MysqlHelper.deleteUserByEmail("tonysduarte@gmail.com");
  });

  test("Should return an user on success", async () => {
    await request(app)
      .post("/api/user")
      .send({
        name: "Tony",
        email: "tonysduarte@gmail.com",
        password: "valid_password",
        passwordConfirmation: "valid_password",
        accessToken: "any_accessToken",
      })
      .expect(200);
  });
});
