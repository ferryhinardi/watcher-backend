import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';

import { startScrapping, startSelenium } from '../modules/shared/lib';
import { MOVIE_URL, ENGINE_API_KEY } from '../config/app';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

const opts = {
  typeDefs,
  resolvers,
  introspection: true,
  playground: process.env.NODE_ENV !== 'production',
};

if (process.env.NODE_ENV !== 'test') {
  opts.engine = { apiKey: ENGINE_API_KEY };
}

const server = new ApolloServer(opts);
const app = express();

app.use(
  cors({
    optionsSuccessStatus: 200,
  })
);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

/* =============================== */
// Route API
/* =============================== */
app.get('/start-scrapping', async (req, res) => {
  startScrapping(movieListUrl => {
    const moviePlayListUrls = movieListUrl.map(
      url => `${MOVIE_URL}${url}/play`
    );
    startSelenium(moviePlayListUrls);
  });
  res.sendStatus(200);
});

server.applyMiddleware({
  app,
  path: '/',
});

export default app;
