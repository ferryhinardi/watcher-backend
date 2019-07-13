'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startScrapping = startScrapping;

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _cheerio = require('cheerio');

var _cheerio2 = _interopRequireDefault(_cheerio);

var _app = require('../../../../config/app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var url = _app.MOVIE_URL;

function getListFilm($, cb) {
  var films = [];

  $('div[id="featured"] div[data-movie-id]').each(function (i, value) {
    var dataMovieId = $(value).attr('data-movie-id');
    films.push(dataMovieId);
  });

  cb && cb(films);
}

function getDataFilm(href, cb) {
  (0, _request2.default)('' + url + href, function (err, res, body) {
    if (err && res.statusCode !== 200) throw err;
    var $ = _cheerio2.default.load(body);
    var dataFilm = { url: '' + url + href };

    $('h3[itemprop="name"]').each(function (i, value) {
      var title = $(value).attr('content');
      dataFilm.title = title;
    });
    $('div[itemprop="description"] span').each(function (i, value) {
      var description = $(value).text();
      dataFilm.description = description;
    });
    cb && cb(dataFilm);
  });
}

/**
 * Note: Stuck to waiting load video url
 * ToDo: Create Selenium Engine
 */
function getVideoUrl(href, cb) {
  (0, _request2.default)('' + url + href + '/play', function (err, res, body) {
    if (err && res.statusCode !== 200) throw err;

    setTimeout(function () {
      var $ = _cheerio2.default.load(body);
      var videoEl = $('div[id="colimedia"] video');
      console.log('video...', videoEl);
    }, 10000);
  });
}

function handlingScrapping(err, res, body, cb) {
  if (err && res.statusCode !== 200) throw err;
  var $ = _cheerio2.default.load(body);

  getListFilm($, function (films) {
    films.forEach(function (hrefFilm) {
      getDataFilm(hrefFilm);
    });
    cb(films);
  });
}

function startScrapping(cb) {
  (0, _request2.default)(url, function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return handlingScrapping.apply(undefined, args.concat([cb]));
  });
}