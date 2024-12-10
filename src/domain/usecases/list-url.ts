import { UrlShortenerModel } from "../models/shortener";

export interface ListUrl {
  list(id: string): Promise<UrlShortenerModel[]>;
}
