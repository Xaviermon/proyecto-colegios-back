import Sequelize from "sequelize";
import fs from "fs";
import path from "path";
import dataConfig from "../config/dataBase"

const db: any = {};

const sequelize = new Sequelize.Sequelize(dataConfig.development.database, dataConfig.development.username, dataConfig.development.password, {
  host: dataConfig.development.host,
  dialect: "postgres",
  logging: false,
  native: false,
});

const modelsDir = path.join(__dirname, '../models');

fs.readdirSync(modelsDir)
  .filter((file: string) => {
    return (
      file.indexOf(".") !== 0 && file.slice(-3) === ".ts"
    );
  })
  .forEach((file: any) => {
    const model = require(path.join(modelsDir, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;