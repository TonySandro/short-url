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

    const httpResponse = await sut.handle(httpRequest.body);
    expect(httpResponse).toEqual({ statusCode: 200 });
  });
});
