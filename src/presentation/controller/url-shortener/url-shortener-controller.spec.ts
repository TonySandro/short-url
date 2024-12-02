import { MissingParamError } from "../../errors";
import { UrlShortenerController } from "./url-shortener-controller";

const makeSut = () => {
  return new UrlShortenerController();
};

describe("Url Shortener Controller", () => {
  test("Should return 400 if no url is provided ", async () => {
    const sut = makeSut();
    const httpResponse = await sut.handle({ body: {} });

    expect(httpResponse.body).toEqual(new MissingParamError("url"));
  });
});
