import 'module-alias/register';
import 'reflect-metadata';
import http from 'http';
import express from 'express';
import { createConnection } from 'typeorm';
import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware';
import routes from './services';
import errorHandlers from '@middleware/errorHandlers';

process.on('uncaughtException', e => {
  console.log(e);
  process.exit(1);
});
process.on('unhandledRejection', e => {
  console.log(e);
  process.exit(1);
});

const router = express();
const { PORT = 3001, IP } = process.env;
const server = http.createServer(router);

(async () => {
  try {
    await createConnection().then(conn => {
      
    });
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  applyMiddleware(middleware, router);
  applyRoutes(routes, router);
  applyMiddleware(errorHandlers, router);

  server.listen(PORT, () => console.log(`Server is running http://${IP || 'localhost'}:${PORT}...`));
})();
