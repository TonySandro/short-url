import jwt from "jsonwebtoken";
import { JwtAdapter } from "./jwt-adapter";

jest.mock("jsonwebtoken", () => ({
  async sign(): Promise<string> {
    return new Promise((resolve) => resolve("any_token"));
  },
}));

interface SutTypes {
  sut: JwtAdapter;
}

const makeSut = (): SutTypes => {
  const sut = new JwtAdapter("secret");

  return {
    sut,
  };
};

describe("JWT Adapter", () => {
  test("Should call sign with correct values", async () => {
    const { sut } = makeSut();

    const signSpy = jest.spyOn(jwt, "sign");
    await sut.encrypt("any_id");

    expect(signSpy).toHaveBeenCalledWith({ id: "any_id" }, "secret");
  });

  test("Should return a token on sign success", async () => {
    const { sut } = makeSut();
    const accessToken = await sut.encrypt("any_id");

    expect(accessToken).toBe("any_token");
  });

  test("Should throw if sign throws", async () => {
    const { sut } = makeSut();
    jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.encrypt("any_id");

    await expect(promise).rejects.toThrow();
  });
});
