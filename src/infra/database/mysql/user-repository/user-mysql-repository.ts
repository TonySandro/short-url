import { AddUserRepository } from "../../../../data/protocols/database/add-user-repository";
import { UserModel } from "../../../../domain/models/user";
import { AddUserModel } from "../../../../domain/usecases/add-user";
import { AppDataSource } from "../../../../main/config/typeorm.config";

export class UserMysqlRepository implements AddUserRepository {
  async add(user: AddUserModel): Promise<UserModel> {
    const userRepository = AppDataSource.getRepository(UserModel);

    const newUser = userRepository.create(user);

    return await userRepository.save(newUser);
  }
}
