import request from 'request';
import cheerio from 'cheerio';
// import { insertMovie } from '../../../movies/resolvers/movie';
import { MOVIE_URL } from '../../../../config/app';

const url = MOVIE_URL;

function getListFilm($, cb) {
  const films = [];

  $('div[data-movie-id]').each((i, value) => {
    const dataMovieId = $(value).attr('data-movie-id');
    films.push(dataMovieId);
  });

  cb && cb(films);
}

function getDataFilm(baseUrl, href, cb) {
  request(`${baseUrl}${href}`, function(err, res, body) {
    if (err && res.statusCode !== 200) throw err;
    const $ = cheerio.load(body);
    const dataFilm = { url: `${url}${href}` };

    $('h3[itemprop="name"]').each((i, value) => {
      const title = $(value).attr('content');
      dataFilm.title = title;
    });
    $('meta[itemprop="image"]').each((i, value) => {
      const imageUrl = $(value).attr('content');
      dataFilm.imageUrl = imageUrl;
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
/*
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
*/
function handlingScrapping(err, res, body, source, baseUrl, cb) {
  if (err && res.statusCode !== 200) throw err;
  const $ = cheerio.load(body);

  getListFilm($, films => {
    for (const index in films) {
      const hrefFilm = films[index];
      getDataFilm(baseUrl, hrefFilm, movie => {
        const data = { ...movie, source_id: source.id };
        console.log('data film', data);
        // insertMovie(data);
      });
    }

    cb(films);
  });
}

export function startScrapping({ baseUrl, pageUrl, source }, cb) {
  request(pageUrl, (...args) =>
    handlingScrapping(...args, source, baseUrl, cb)
  );
}
