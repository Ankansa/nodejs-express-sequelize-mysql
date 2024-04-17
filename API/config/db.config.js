const { dbHost, dbUser, dbPassword, databaseName } = require('../load_env');

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Ankan@123",
    DB: "company",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };