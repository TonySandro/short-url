import { AddUrlShortener } from "../../../domain/usecases/add-url-shortener";
import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http/http-helper";
import { NodeUrlShortener } from "../../helpers/shortener/node-url-shortener";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class UrlShortenerController implements Controller {
  constructor(
    private readonly addUrlShortener: AddUrlShortener,
    private readonly nodeUrlShortener: NodeUrlShortener
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { originalUrl } = httpRequest.body;

    if (!originalUrl) return badRequest(new MissingParamError("originalUrl"));

    const shortUrl = this.nodeUrlShortener.short(originalUrl);
    if (shortUrl) return badRequest(shortUrl);

    this.addUrlShortener.add({
      originalUrl,
      shortUrl,
    });

    return new Promise((resolve) => resolve(null));
  }
}
