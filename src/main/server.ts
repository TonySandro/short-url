import { AppDataSource } from "./config/typeorm.config";

AppDataSource.initialize()
  .then(async () => {
    const app = (await import("./config/app")).default;
    app.listen(5052, () =>
      console.log(`server running at http://localhost:5052`)
    );
  })
  .catch(console.error);
