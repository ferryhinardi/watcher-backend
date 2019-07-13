'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _apolloServerExpress = require('apollo-server-express');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _lib = require('../modules/shared/lib');

var _app = require('../config/app');

var _typeDefs = require('./typeDefs');

var _typeDefs2 = _interopRequireDefault(_typeDefs);

var _resolvers = require('./resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var opts = {
  typeDefs: _typeDefs2.default,
  resolvers: _resolvers2.default,
  introspection: true,
  playground: process.env.NODE_ENV !== 'production'
};

if (process.env.NODE_ENV !== 'test') {
  opts.engine = { apiKey: _app.ENGINE_API_KEY };
}

var server = new _apolloServerExpress.ApolloServer(opts);
var app = (0, _express2.default)();

app.use((0, _cors2.default)({
  optionsSuccessStatus: 200
}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

/* =============================== */
// Route API
/* =============================== */
app.get('/start-scrapping', function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _lib.startScrapping)(function (movieListUrl) {
              var moviePlayListUrls = movieListUrl.map(function (url) {
                return '' + _app.MOVIE_URL + url + '/play';
              });
              (0, _lib.startSelenium)(moviePlayListUrls);
            });
            res.sendStatus(200);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

server.applyMiddleware({
  app: app,
  path: '/'
});

exports.default = app;
module.exports = exports.default;