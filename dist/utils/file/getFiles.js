'use strict';

var glob = require('glob');

module.exports = function (dir) {
  return glob.sync(dir);
};