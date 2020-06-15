import 'reflect-metadata';
import 'dotenv/config';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
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
  try {
    do {
      await createConnection();
    } while (retries);
  } catch (err) {
    console.log(err);
    retries -= 1;
    console.log(retries);
    await new Promise(res => setTimeout(res, 5000));
  }

  const apolloServer = new ApolloServer({
    schema: _schema as any,
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`server running @ PORT:${PORT} 🚀`);
  });
})();
