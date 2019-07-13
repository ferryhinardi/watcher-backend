'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startSelenium = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var startSelenium = exports.startSelenium = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(moviesUrls) {
    var start = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(index, url) {
        var chromeService, driver, videoElement, movieUrl;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                chromeService = new _chrome2.default.ServiceBuilder(_chromedriver.path).build();

                _chrome2.default.setDefaultService(chromeService);
                _context.next = 4;
                return new _seleniumWebdriver.Builder().forBrowser('chrome').build();

              case 4:
                driver = _context.sent;
                _context.prev = 5;
                _context.next = 8;
                return driver.get(url);

              case 8:
                videoElement = _seleniumWebdriver.By.tagName('video.jw-video');
                _context.next = 11;
                return driver.wait(_seleniumWebdriver.until.elementLocated(videoElement));

              case 11:
                _context.next = 13;
                return driver.findElement(videoElement).getAttribute('src');

              case 13:
                movieUrl = _context.sent;

                console.log('movieUrl', movieUrl);

              case 15:
                _context.prev = 15;
                _context.next = 18;
                return driver.quit();

              case 18:
                _context.next = 20;
                return chromeService.kill();

              case 20:
                console.log(index + ' - ' + url + ' done scapping...');
                return _context.finish(15);

              case 22:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[5,, 15, 22]]);
      }));

      return function start(_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    var index;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.t0 = _regenerator2.default.keys(moviesUrls);

          case 2:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 8;
              break;
            }

            index = _context2.t1.value;
            _context2.next = 6;
            return start(index, moviesUrls[index]);

          case 6:
            _context2.next = 2;
            break;

          case 8:
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t2 = _context2['catch'](0);

            console.error('error catch...', _context2.t2);

          case 13:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[0, 10]]);
  }));

  return function startSelenium(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _seleniumWebdriver = require('selenium-webdriver');

var _chrome = require('selenium-webdriver/chrome');

var _chrome2 = _interopRequireDefault(_chrome);

var _chromedriver = require('chromedriver');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }