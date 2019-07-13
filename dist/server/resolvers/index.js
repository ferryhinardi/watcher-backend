'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolversArray = (0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, '../../modules/**/resolvers/*.js'), {
  extensions: ['.js']
});
var resolversWithoutTest = (0, _mergeGraphqlSchemas.fileLoader)(_path2.default.join(__dirname, '../../modules/**/resolvers/**/!(__tests__)/*.js'), { extensions: ['.js'] });

var resolvers = resolversArray.concat(resolversWithoutTest);

exports.default = (0, _mergeGraphqlSchemas.mergeResolvers)(resolvers);
module.exports = exports.default;