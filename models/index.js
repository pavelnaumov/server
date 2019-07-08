import Sequelize from "sequelize";

const sequelize = new Sequelize("social_network", "postgres", "123456", {
  dialect: "postgres"
});

const models = {
  User: sequelize.import("./user"),
  Post: sequelize.import("./post"),
  Comment: sequelize.import("./comment")
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;
