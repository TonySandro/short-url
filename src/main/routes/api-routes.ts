import { Router } from "express";
import { adaptRoute } from "../adapters/express/express-route-adapter";
import { makeUserRegistrationController } from "../factories/user-registration-factory";
import { makeUrlShortenerController } from "../factories/url-shortener-factory";

export default (router: Router): void => {
  router.post("/user", adaptRoute(makeUserRegistrationController()));
  router.post("/url", adaptRoute(makeUrlShortenerController()));
};
