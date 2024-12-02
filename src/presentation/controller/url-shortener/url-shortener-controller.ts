import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http/http-helper";
import { NodeUrlShortener } from "../../helpers/shortener/node-url-shortener";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class UrlShortenerController implements Controller {
  constructor(private readonly nodeUrlShortener: NodeUrlShortener) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.originalUrl) {
      return badRequest(new MissingParamError("originalUrl"));
    }

    const error = this.nodeUrlShortener.short(httpRequest.body.originalUrl);
    if (error) {
      return badRequest(error);
    }

    return new Promise((resolve) => resolve(null));
  }
}
