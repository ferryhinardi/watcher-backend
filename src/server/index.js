import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import get from 'lodash/get';
import { findSource } from '../modules/sources/resolvers/source';
import { startScrapping, startSelenium } from '../modules/shared/lib';
import { ENGINE_API_KEY } from '../config/app';

import context from './context';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import schemaDirectives from './directives';

const opts = {
  typeDefs,
  resolvers,
  context,
  schemaDirectives,
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
  const id = req.query.id;
  const source = await findSource(id);
  const baseUrl = get(source, 'name');
  const pageUrl = get(source, 'link');
  startScrapping({ baseUrl, pageUrl, source }, movieListUrl => {
    console.log('movieListUrl', movieListUrl);
    //   const moviePlayListUrls = movieListUrl.map(url => `${baseUrl}${url}/play`);
    //   startSelenium(moviePlayListUrls);
  });
  res.json({ id, baseUrl, pageUrl });
  res.sendStatus(200);
});

server.applyMiddleware({
  app,
  path: '/',
});

export default app;
