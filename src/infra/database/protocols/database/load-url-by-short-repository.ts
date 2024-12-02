export interface LoadUrlByShortRepository {
  loadByShort(shortUrl: string): Promise<{ originalUrl: string } | null>;
  incrementClicks(shortUrl: string): Promise<void>;
}
