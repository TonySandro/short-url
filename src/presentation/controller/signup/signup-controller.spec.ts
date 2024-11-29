import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, success } from "../../helpers/http/http-helper";
import { SignupController } from "./signup-controller";

const makeSut = () => {
  return new SignupController();
};

describe("Signup Controller", () => {
  test("Should return 200 if success", async () => {
    const sut = makeSut();
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
    const sut = makeSut();
    const httpRequest = {
      body: {
        password: "any_password",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("name")));
  });

  test("Should return 400 if no password is provide", async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        name: "any_name",
      },
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new MissingParamError("password")));
  });
});
