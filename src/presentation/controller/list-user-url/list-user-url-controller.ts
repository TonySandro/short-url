import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListUserUrlController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.id) return badRequest(new MissingParamError("id"));

    return new Promise((resolve) => resolve(null));
  }
}
