import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;

  const { secret } = authConfig.jwt;

  if (!authHeader) {
    throw new Error('Token is missing!');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret);
    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    next();
  } catch (err) {
    throw new Error('Invalid token!');
  }
}

export { ensureAuthenticated };
