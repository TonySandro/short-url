import { Controller } from "../../../presentation/protocols";
import { UrlShortenerMysqlRepository } from "../../../infra/database/mysql/url-shortener-repository/url-shortener-mysql-repository";
import { ListUserUrlController } from "../../../presentation/controller/list-user-url/list-user-url-controller";
import { DbListUrl } from "../../../data/usecases/list-url/db-list-url";

export const makeUserUrlListController = (): Controller => {
  const listUserUrlRepository = new UrlShortenerMysqlRepository();
  const dbAddUrl = new DbListUrl(listUserUrlRepository);
  return new ListUserUrlController(dbAddUrl);
};