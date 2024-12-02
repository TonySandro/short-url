import app from "./config/app";
import { AppDataSource } from "./config/typeorm.config";

AppDataSource.initialize()
  .then(() => {
    app.listen(5050, () =>
      console.log(`server running at http://localhost:5050`)
    );
  })
  .catch((error) => console.error("Database connection failed:", error));
