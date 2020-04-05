import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './modules/user/userResolver';
import { createConnection } from 'typeorm';
import cookieParser from 'cookie-parser';
import { handleRefresh } from './modules/user/helpers';

(async () => {
  const app = express();
  const PORT = 4000;
  app.use(cookieParser());

  app.get('/', (_req, res) => {
    res.send('Hello world');
  });

  app.post('/refresh_token', handleRefresh);

  await createConnection({
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'ticket-dash',
    type: 'postgres',
    entities: [`${__dirname}/src/entity/**/*.ts`],
  });
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`server running @ PORT:${PORT} 🚀`);
  });
})();
