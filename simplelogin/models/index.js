'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const Client = require('./client');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Client = Client;

Client.init(sequelize);

Client.associate(db);

module.exports = db;
