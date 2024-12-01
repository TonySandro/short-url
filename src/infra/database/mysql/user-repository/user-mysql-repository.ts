import { AddUserModel } from "../../../../domain/usecases/add-user";

export class UserMysqlRepository {
  async add(user: AddUserModel): Promise<AddUserModel> {
    return user;
  }
}
