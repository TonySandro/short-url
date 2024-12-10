import { ListUrl } from "../../../domain/usecases/list-url";
import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class ListUserUrlController implements Controller {
  constructor(private readonly listUrl: ListUrl) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.id) return badRequest(new MissingParamError("id"));
    this.listUrl.list(httpRequest.body.id);

    return new Promise((resolve) => resolve(null));
  }
}
