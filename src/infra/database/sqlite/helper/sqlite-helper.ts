import { DataSource } from "typeorm";

export const SqliteHelper = {
  dataSource: DataSource,

  async connect(model: any) {
    this.dataSource = new DataSource({
      type: "sqlite",
      database: ":memory:",
      dropSchema: true,
      entities: [model],
      synchronize: true,
      logging: false,
    });

    await this.dataSource.initialize();
  },

  async disconnect() {
    if (this.dataSource && this.dataSource.isInitialized) {
      await this.dataSource.destroy();
    }
  },

  async clear() {
    const entities = this.dataSource.entityMetadatas;
    for (const entity of entities) {
      const repository = this.dataSource.getRepository(entity.name);
      await repository.clear();
    }
  },
};
