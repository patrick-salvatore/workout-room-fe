import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
// import UserResolver from './modules/user';

export async function generateSchema(): Promise<GraphQLSchema> {
  try {
    const schema = await buildSchema({
      resolvers: [__dirname + '/**/*.resolver.ts'],
    });

    return schema;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
