import { MissingParamError } from "../../errors";
import { ListUserUrlController } from "./list-user-url-controller";

const makeSut = () => {
  return new ListUserUrlController();
};

describe("List User Urls Controller", () => {
  test("Should return 400 if no user id is provided", async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {},
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError("id"));
  });
});
