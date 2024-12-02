import { Controller } from "../../presentation/protocols";
import { UserRegistrationController } from "../../presentation/controller/user-registration/user-registration-controller";
import { DbAddUser } from "../../data/usecases/add-account/db-add-user";
import { UserMysqlRepository } from "../../infra/database/mysql/user-repository/user-mysql-repository";

export const makeUserRegistrationController = (): Controller => {
  const addUserRepository = new UserMysqlRepository();
  const addUser = new DbAddUser(addUserRepository);
  const userController = new UserRegistrationController(addUser);
  return userController;
};
