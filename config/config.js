require('dotenv').config();

module.exports = {
  "development": {
    "host": process.env.MYSQL_HOST,
    "database": process.env.MYSQL_DATABASE,
    "username": process.env.MYSQL_USER,
    "password": process.env.MYSQL_PASSWORD,
    "dialect": "mysql",
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "sequelize",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "sequelize",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};