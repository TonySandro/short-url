import { NodeUrlShortener } from "../../presentation/helpers/shortener/node-url-shortener";
import env from "../../main/config/env";

const loadNanoid = async () => {
  const { nanoid } = await import("nanoid");
  return nanoid;
};

export class nanoidAdapter implements NodeUrlShortener {
  async short(originalUrl: string) {
    const urlDatabase: Record<string, string> = {};
    const baseUrl = env.baseUrl;

    const nanoid = await loadNanoid();
    let id = nanoid(6);
    urlDatabase[id] = originalUrl;
    return `${baseUrl}/${id}`;
  }
}
