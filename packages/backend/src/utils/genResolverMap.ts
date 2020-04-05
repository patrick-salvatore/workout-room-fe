import { mergeResolvers } from 'merge-graphql-schemas';
import * as path from 'path';
import * as glob from 'glob';

export const genSchema = () => {
  const pathToModules = path.join(__dirname, 'src', 'modules');

  const resolvers = glob
    .sync(`${pathToModules}/**/resolvers.?s`)
    .map(resolver => require(resolver).resolvers);

  return mergeResolvers(resolvers);
};
