'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _getFiles = require('../utils/file/getFiles');

var _getFiles2 = _interopRequireDefault(_getFiles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/database')[env];
var db = {};
var sequelize = void 0;

var modelsFile = (0, _getFiles2.default)(_path2.default.join(__dirname, '../modules/**/models/*.js'));

if (config.use_env_variable) {
  sequelize = new _sequelize2.default(process.env[config.use_env_variable], config);
} else {
  sequelize = new _sequelize2.default(config.database, config.username, config.password, config);
}

modelsFile.forEach(function (modelFile) {
  var model = sequelize.import(modelFile);
  db[model.name] = model;
});

(0, _keys2.default)(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = _sequelize2.default;

exports.default = db;
module.exports = exports.default;