import { Express } from "express";
import { cors, bodyParser, contentType } from "../middlewares";

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
};
