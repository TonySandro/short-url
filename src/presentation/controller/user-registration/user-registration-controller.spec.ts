import { UserModel } from "../../../domain/models/user";
import { AddUser, AddUserModel } from "../../../domain/usecases/add-user";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, success } from "../../helpers/http/http-helper";
import { UserRegistrationController } from "./user-registration-controller";

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add(user: AddUserModel): Promise<UserModel> {
      const FakeUser = {
        id: "valid_id",
        name: "valid_name",
        password: "valid_password",
      };

      return new Promise((resolve) => resolve(FakeUser));
    }
  }

  return new AddUserStub();
};

const makeSut = () => {
  const addUserStub = makeAddUser();
  const sut = new UserRegistrationController(addUserStub);

  return {
    sut,
    addUserStub,
  };
};

describe("Signup Controller", () => {
  test("Should return 200 if success", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(success(httpRequest));
  });

  test("Should return 400 if no name is provide", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("name")));
  });

  test("Should return 400 if no password is provide", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("password")));
  });

  test("Should call AddUser with correct values", async () => {
    const { sut, addUserStub } = makeSut();
    const addSpy = jest.spyOn(addUserStub, "add");

    const httpRequest = {
      body: {
        name: "any_name",
        password: "any_password",
      },
    };

    await sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      password: "any_password",
    });
  });
});
