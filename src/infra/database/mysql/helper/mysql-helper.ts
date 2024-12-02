import { AppDataSource } from "../../../../main/config/typeorm.config";

export const MysqlHelper = {
  async connect() {
    await AppDataSource.initialize();
  },

  async disconnect() {
    if (AppDataSource && AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  },

  async clear() {
    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);
      await repository.clear();
    }
  },

  async deleteUserByEmail(email: string): Promise<void> {
    const userRepository = AppDataSource.getRepository("users");
    const user = await userRepository.findOne({ where: { email } });

    await userRepository.remove(user);
  },

  async deleteByOriginalUrl(originalUrl: string): Promise<void> {
    const repository = AppDataSource.getRepository("url_shorteners");
    const response = await repository.findOne({ where: { originalUrl } });

    await repository.remove(response);
  },
};
