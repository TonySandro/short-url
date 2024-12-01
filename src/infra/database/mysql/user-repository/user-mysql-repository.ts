import { AddUserModel } from "../../../../domain/usecases/add-user";
import { MysqlHelper } from "../helper/mysql-helper";

export class UserMysqlRepository {
  async add(user: AddUserModel): Promise<AddUserModel> {
    const result = await MysqlHelper.add(user);

    if (result) return user;
  }
}
