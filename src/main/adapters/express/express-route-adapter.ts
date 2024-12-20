import { Controller, HttpRequest } from "../../../presentation/protocols";
import { Request, Response } from "express";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body,
      params: req.params,
      headers: req.headers,
      query: req.query,
    };
    const httpResponse = await controller.handle(httpRequest);
    if (httpResponse.statusCode === 302 && httpResponse.headers?.Location) {
      return res.redirect(httpResponse.headers.Location);
    }

    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body);
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message });
    }
  };
};
