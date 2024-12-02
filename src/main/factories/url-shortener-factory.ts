import { Controller } from "../../presentation/protocols";
import { UrlShortenerController } from "../../presentation/controller/url-shortener/url-shortener-controller";
import { DbAddUrl } from "../../data/usecases/add-url/db-add-url";
import { UrlShortenerMysqlRepository } from "../../infra/database/mysql/url-shortener-repository/url-shortener-mysql-repository";
import { nanoidAdapter } from "../../infra/shortener/nanoid-adapter";

export const makeUrlShortenerController = (): Controller => {
  const addUrlRepository = new UrlShortenerMysqlRepository();
  const urlShortenerAdapter = new nanoidAdapter();
  const dbAddUrl = new DbAddUrl(addUrlRepository);
  const urlController = new UrlShortenerController(
    dbAddUrl,
    urlShortenerAdapter
  );

  return urlController;
};
