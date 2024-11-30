import {
  UserModel,
  AddUserModel,
  AddUserRepository,
} from "./db-add-user-protocols";
import { DbAddUser } from "./db-add-user";

const makeAddUserRepository = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add(user: AddUserModel): Promise<UserModel> {
      return new Promise((resolve) => resolve(makeFakeUser()));
    }
  }
  return new AddUserRepositoryStub();
};

const makeFakeUser = (): UserModel => ({
  id: "valid_id",
  name: "valid_name",
  email: "valid_email",
});

const makeFakeUserData = (): AddUserModel => ({
  name: "valid_name",
  email: "valid_email",
});

interface SutTypes {
  sut: DbAddUser;
  addUserRepositoryStub: AddUserRepository;
}

const makeSut = (): SutTypes => {
  const addUserRepositoryStub = makeAddUserRepository();
  const sut = new DbAddUser(addUserRepositoryStub);

  return {
    sut,
    addUserRepositoryStub,
  };
};

describe("DB AddUser Usecase", () => {
  test("Should return an user on success", async () => {
    const { sut } = makeSut();

    const user = await sut.add(makeFakeUserData());
    expect(user).toEqual(makeFakeUser());
  });
});
