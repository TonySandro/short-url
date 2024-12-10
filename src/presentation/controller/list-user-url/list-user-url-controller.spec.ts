import { UrlShortenerModel } from "../../../domain/models/shortener";
import { UserModel } from "../../../domain/models/user";
import { ListUrl } from "../../../domain/usecases/list-url";
import { MissingParamError } from "../../errors";
import { ListUserUrlController } from "./list-user-url-controller";

const makeListUrl = (): ListUrl => {
  class ListUrlStub implements ListUrl {
    async list(id: string): Promise<UrlShortenerModel[]> {
      const FakeUrl: UrlShortenerModel = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        originalUrl: "https://example.com",
        shortUrl: "abc123",
        user: {
          id: "456e7890-e12d-34f5-b678-426614174111",
          name: "Tony S.",
          email: "tony.s@example.com",
          password: "hashed_password",
          createdAt: new Date("2024-01-01T00:00:00Z"),
          updatedAt: new Date("2024-01-01T00:00:00Z"),
        } as UserModel,
        clickCount: 10,
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-02T00:00:00Z"),
        deletedAt: null,
      };

      return new Promise((resolve) => resolve([FakeUrl]));
    }
  }

  return new ListUrlStub();
};

const makeHttpRequest = () => ({
  body: { id: "valid_id" },
});

const makeSut = () => {
  const listUrlStub = makeListUrl();
  const sut = new ListUserUrlController(listUrlStub);

  return {
    sut,
    listUrlStub,
  };
};

describe("List User Urls Controller", () => {
  test("Should return 400 if no user id is provided", async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {},
    };

    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse.body).toEqual(new MissingParamError("id"));
  });

  test("Should call ListUrl with correct values", async () => {
    const { sut, listUrlStub } = makeSut();
    const addSpy = jest.spyOn(listUrlStub, "list");

    await sut.handle(makeHttpRequest());
    expect(addSpy).toHaveBeenCalledWith(makeHttpRequest().body.id);
  });
});
