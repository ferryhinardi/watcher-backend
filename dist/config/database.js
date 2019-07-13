'use strict';

require('dotenv').config(); // magic

module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'watcher',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: console.log,
    operatorsAliases: false,
    quoteIdentifiers: false // set case-insensitive
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    operatorsAliases: false,
    quoteIdentifiers: false // set case-insensitive
  },
  staging: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'equivalent',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: console.log,
    operatorsAliases: false,
    quoteIdentifiers: false // set case-insensitive
  },
  production: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'equivalent',
    host: process.env.DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    logging: console.log,
    operatorsAliases: false,
    quoteIdentifiers: false // set case-insensitive
  }
};