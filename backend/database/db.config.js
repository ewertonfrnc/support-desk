const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://postgres:1364@localhost:5432/support-desk",
);

module.exports = sequelize;
