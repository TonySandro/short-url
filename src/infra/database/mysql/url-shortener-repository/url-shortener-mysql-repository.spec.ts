import { MysqlHelper } from "../helper/mysql-helper";
import { UrlShortenerMysqlRepository } from "./url-shortener-mysql-repository";

const makeSut = () => {
  return new UrlShortenerMysqlRepository();
};

describe("Url Shortener Mysql repository", () => {
  beforeAll(async () => {
    await MysqlHelper.connect();
  });

  afterAll(async () => {
    await MysqlHelper.disconnect();
  });

  afterEach(async () => {
    await MysqlHelper.clear();
  });

  test("Should save short url if success", async () => {
    const sut = makeSut();

    const account = await sut.add({
      originalUrl: "any_originalUrl",
      shortUrl: "anyUrl",
    });

    expect(account).toBeTruthy();
    expect(account.originalUrl).toBe("any_originalUrl");
    expect(account.shortUrl).toBe("anyUrl");
  });
});
