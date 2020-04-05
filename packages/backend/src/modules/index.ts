import { UserResolver } from './user';
import { buildSchema } from 'type-graphql';

const schema = buildSchema({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolvers: [UserResolver] as any,
});

export default schema;
