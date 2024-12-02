import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeUserRegistrationController } from "../factories/user-registration-factory";

export default (router: Router): void => {
  router.post("/user", adaptRoute(makeUserRegistrationController()));
};
