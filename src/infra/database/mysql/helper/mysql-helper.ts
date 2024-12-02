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
};
