import { UserModel } from "../models/user";

export interface AddUserModel {
  name: string;
  password: string;
}

export interface AddUser {
  add(user: AddUserModel): Promise<UserModel>;
}
