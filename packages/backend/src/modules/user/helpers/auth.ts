import { verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { IAGContext } from '../../../interfaces/AGContext';

export const checkAuthorization: MiddlewareFn<IAGContext> = (
  { context },
  next
) => {
  const authorizationHeader = context.req.headers['authorization'];

  if (!authorizationHeader) {
    throw new Error('You are not authorized');
  }

  try {
    const authToken = authorizationHeader.split(' ')[1];
    const payload = verify(authToken, `${process.env.ACCESS_SECRET}`);
    context.payload = payload;
  } catch (err) {
    console.error(err);
    throw new Error('You are not authorized');
  }

  return next();
};
