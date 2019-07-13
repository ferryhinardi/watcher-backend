'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cheerio = require('./cheerio');

Object.defineProperty(exports, 'startScrapping', {
  enumerable: true,
  get: function get() {
    return _cheerio.startScrapping;
  }
});

var _selenium = require('./selenium');

Object.defineProperty(exports, 'startSelenium', {
  enumerable: true,
  get: function get() {
    return _selenium.startSelenium;
  }
});