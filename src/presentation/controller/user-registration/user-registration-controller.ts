import { AddUser } from "../../../domain/usecases/add-user";
import { MissingParamError } from "../../errors/missing-param-error";
import { badRequest, success } from "../../helpers/http/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class UserRegistrationController implements Controller {
  constructor(private readonly addUser: AddUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ["name", "password"];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    const { name, password } = httpRequest.body;
    this.addUser.add({ name, password });

    return success(httpRequest);
  }
}
