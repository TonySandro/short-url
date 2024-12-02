import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http/http-helper";
import { NodeUrlShortener } from "../../helpers/shortener/node-url-shortener";
import { HttpRequest } from "../../protocols";
import { UrlShortenerController } from "./url-shortener-controller";

const makeFakeRequest = (): HttpRequest => ({
  body: {
    originalUrl: "https://teddydigital.io/sobre/",
  },
});

const makeNodeUrlShortener = (): NodeUrlShortener => {
  class NodeUrlShortenerStub implements NodeUrlShortener {
    short(originalUrl: string) {
      return {
        originalUrl: "https://teddydigital.io/sobre/",
        shortUrl: "http://localhost/aZbKq7",
      };
    }
  }

  return new NodeUrlShortenerStub();
};

const makeSut = () => {
  const nodeUrlShortenerStub = makeNodeUrlShortener();
  const sut = new UrlShortenerController(nodeUrlShortenerStub);

  return {
    sut,
    nodeUrlShortenerStub,
  };
};

describe("Url Shortener Controller", () => {
  test("Should return 400 if no originalUrl is provided ", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({ body: {} });

    expect(httpResponse.body).toEqual(new MissingParamError("originalUrl"));
  });

  test("Should return 400 if NodeUrlShortener returns an error", async () => {
    const { sut, nodeUrlShortenerStub } = makeSut();
    jest
      .spyOn(nodeUrlShortenerStub, "short")
      .mockReturnValueOnce(new MissingParamError("any_field"));

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual(
      badRequest(new MissingParamError("any_field"))
    );
  });
});
