import app from "./src/app.mjs";
import sequelize from "./src/db/index.mjs";
import { setupAssociations } from "./src/models/associations.mjs";
import { testConnection } from "./src/db/index.mjs";

const PORT = 3000;

const startServer = async () => {
  await testConnection();

  setupAssociations();

  await sequelize.sync({ alter: true });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
};

startServer();
