'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typesArray = (0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, '../../modules/**/*.gql'));

(0, _mergeGraphqlSchemas.mergeTypes)(typesArray, { all: true });
exports.default = (0, _mergeGraphqlSchemas.mergeTypes)(typesArray, { all: true });
module.exports = exports.default;