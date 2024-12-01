import { UserMysqlRepository } from "./user-mysql-repository";
import { MysqlHelper } from "../helper/mysql-helper";

const makeSut = () => {
  return new UserMysqlRepository();
};

describe("User Mysql repository", () => {
  beforeAll(async () => {
    await MysqlHelper.connect();
  });

  afterAll(async () => {
    await MysqlHelper.disconnect();
  });

  afterEach(async () => {
    await MysqlHelper.deleteUserByEmail("any_email@email.com");
  });

  test("Should return user if success", async () => {
    const sut = makeSut();

    const account = await sut.add({
      name: "any_name",
      email: "any_email@email.com",
      password: "any_password",
    });

    expect(account).toBeTruthy();
    expect(account.name).toBe("any_name");
    expect(account.email).toBe("any_email@email.com");
    expect(account.password).toBeDefined();
  });
});
