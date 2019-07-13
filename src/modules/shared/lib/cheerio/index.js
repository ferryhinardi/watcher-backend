import request from 'request';
import cheerio from 'cheerio';
import { MOVIE_URL } from '../../../../config/app';

const url = MOVIE_URL;

function getListFilm($, cb) {
  const films = [];

  $('div[id="featured"] div[data-movie-id]').each((i, value) => {
    const dataMovieId = $(value).attr('data-movie-id');
    films.push(dataMovieId);
  });

  cb && cb(films);
}

function getDataFilm(href, cb) {
  request(`${url}${href}`, function(err, res, body) {
    if (err && res.statusCode !== 200) throw err;
    const $ = cheerio.load(body);
    const dataFilm = { url: `${url}${href}` };

    $('h3[itemprop="name"]').each((i, value) => {
      const title = $(value).attr('content');
      dataFilm.title = title;
    });
    $('div[itemprop="description"] span').each((i, value) => {
      const description = $(value).text();
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
  request(`${url}${href}/play`, function(err, res, body) {
    if (err && res.statusCode !== 200) throw err;

    setTimeout(() => {
      const $ = cheerio.load(body);
      const videoEl = $('div[id="colimedia"] video');
      console.log('video...', videoEl);
    }, 10000);
  });
}

function handlingScrapping(err, res, body, cb) {
  if (err && res.statusCode !== 200) throw err;
  const $ = cheerio.load(body);

  getListFilm($, films => {
    films.forEach(hrefFilm => {
      getDataFilm(hrefFilm);
    });
    cb(films);
  });
}

export function startScrapping(cb) {
  request(url, (...args) => handlingScrapping(...args, cb));
}
