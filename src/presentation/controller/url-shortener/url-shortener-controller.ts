import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class UrlShortenerController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.url) {
      return badRequest(new MissingParamError("url"));
    }

    return new Promise(null);
  }
}
