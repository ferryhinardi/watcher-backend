'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _dataloaderSequelize = require('dataloader-sequelize');

var _models = require('../../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var req = _ref.req;
    var dataloaderContext, headers;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dataloaderContext = (0, _dataloaderSequelize.createContext)(_models2.default.sequelize);
            headers = req.headers;


            if (headers.authorization) {
              token = headers.authorization.replace('Bearer ', '');
            }

            return _context.abrupt('return', (0, _defineProperty3.default)({}, _dataloaderSequelize.EXPECTED_OPTIONS_KEY, dataloaderContext));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function context(_x) {
    return _ref2.apply(this, arguments);
  }

  return context;
}();

module.exports = exports.default;