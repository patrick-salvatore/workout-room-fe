import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { handleRefresh } from './modules/user/helpers';
import _schema from './modules';

(async () => {
  const app = express();
  const PORT = 4000;
  app.use(cookieParser());

  app.get('/', (_req, res) => {
    res.send('Hello world');
  });

  app.post('/refresh_token', handleRefresh);

  let retries = 5;
  while (retries)
    try {
      await createConnection({
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'ticket-dash',
        type: 'postgres',
        entities: [`${__dirname}/src/entity/**/*.ts`],
      });
      break;
    } catch (err) {
      console.error(err);
      retries -= 1;

      // wait
      await new Promise(res => setTimeout(res, 5000));
    }

  const apolloServer = new ApolloServer({
    schema: await _schema,
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`server running @ PORT:${PORT} 🚀`);
  });
})();
