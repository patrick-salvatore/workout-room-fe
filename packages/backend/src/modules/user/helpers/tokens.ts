import User from '../../../entity/User';
import { sign } from 'jsonwebtoken';

export const createAccessToken = (user: User): string => {
  const accessToken = sign(
    { userId: user.id },
    `${process.env.ACCESS_SECRET}`,
    {
      expiresIn: '10m',
    }
  );

  return accessToken;
};

export const createRefreshToken = (user: User): string => {
  const refreshToken = sign(
    { userId: user.id },
    `${process.env.REFRESH_SECRET}`,
    {
      expiresIn: '7d',
    }
  );
  return refreshToken;
};

export const createToken = ({
  tokenType,
  payload,
  expiresIn,
}: {
  tokenType: string;
  payload: any;
  expiresIn: string;
}): string => {
  let token = '';

  switch (true) {
    case tokenType === 'access': {
      token = sign(payload, `${process.env.ACCESS_SECRET}`, {
        expiresIn,
      });
      return token;
    }
    case tokenType === 'refresh': {
      token = sign(payload, `${process.env.REFRESH_SECRET}`, {
        expiresIn,
      });
      return token;
    }
    default:
      return token;
  }
};
