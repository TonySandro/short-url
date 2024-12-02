import { AddUrlShortenerRepository } from "../../../../data/protocols/database/add-url-shortener-repository";
import { UrlShortenerModel } from "../../../../domain/models/shortener";
import { AddUrlShortenerModel } from "../../../../domain/usecases/add-url-shortener";
import { AppDataSource } from "../../../../main/config/typeorm.config";

export class UrlShortenerMysqlRepository implements AddUrlShortenerRepository {
  async add(data: AddUrlShortenerModel): Promise<UrlShortenerModel> {
    const userRepository = AppDataSource.getRepository(UrlShortenerModel);
    const newUser = userRepository.create(data);

    return await userRepository.save(newUser);
  }
}
