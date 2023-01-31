import { Dialect, Sequelize } from 'sequelize';

const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
const DB_DIALECT = process.env.DB_DIALECT as Dialect;

const db = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

export default db;
