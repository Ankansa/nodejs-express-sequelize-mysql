// require('dotenv').config(); // Load environment variables from .env file
const dotenv = require("dotenv");
dotenv.config()
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const databaseName = process.env.DATABASE_NAME;
const projectPort = process.env.PORT

module.exports = {
    dbHost,
    dbUser,
    dbPassword,
    databaseName,
    projectPort
};
