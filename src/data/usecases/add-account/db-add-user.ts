import {
  AddUser,
  AddUserModel,
  UserModel,
  AddUserRepository,
} from "./db-add-user-protocols";

export class DbAddUser implements AddUser {
  constructor(private readonly addUserRepository: AddUserRepository) {}
  async add(userData: AddUserModel): Promise<UserModel> {
    const user = await this.addUserRepository.add(userData);

    return user;
  }
}
