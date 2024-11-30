import { UserModel } from "../../../domain/models/user";
import { AddUser, AddUserModel } from "../../../domain/usecases/add-user";
import { ServerError, MissingParamError } from "../../errors";
import {
  badRequest,
  serverError,
  success,
} from "../../helpers/http/http-helper";
import { UserRegistrationController } from "./user-registration-controller";

const makeHttpRequest = () => ({
  body: {
    name: "any_name",
    email: "any_email",
  },
});

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add(user: AddUserModel): Promise<UserModel> {
      const FakeUser = {
        id: "valid_id",
        name: "valid_name",
        email: "valid_email",
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
        email: "any_email",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(success(httpRequest));
  });

  test("Should return 400 if no name is provide", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        email: "any_email",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("name")));
  });

  test("Should return 400 if no email is provide", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
      },
    };

    const httpResponse = await sut.handle(makeHttpRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError("email")));
  });

  test("Should call AddUser with correct values", async () => {
    const { sut, addUserStub } = makeSut();
    const addSpy = jest.spyOn(addUserStub, "add");

    await sut.handle(makeHttpRequest());
    expect(addSpy).toHaveBeenCalledWith({
      name: "any_name",
      email: "any_email",
    });
  });

  test("Should return 500 if AddUser throws", async () => {
    const { sut, addUserStub } = makeSut();
    jest.spyOn(addUserStub, "add").mockImplementationOnce(async () => {
      throw new Error();
    });
    const httpResponse = await sut.handle(makeHttpRequest());

    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });
});
