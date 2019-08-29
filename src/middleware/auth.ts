import { Request, Response, NextFunction } from 'express';
import { HTTP401Error } from '@utils/errors/httpErrors';
import { UserData, validateToken } from '@utils/token';

export interface AuthRequestWithId extends Request {
  user: UserData;
}

const auth = async (
  req: AuthRequestWithId,
  res: Response,
  next: NextFunction
) => {
  if (req.headers.authorization) {
    const bearerToken = req.headers.authorization;
    if (bearerToken.startsWith('Bearer ')) {
      const accessToken = bearerToken.slice(7, bearerToken.length);
      const data =  await validateToken(accessToken);
      if (data.id && data.flag) {
        req.user = data;
        next();
      }
    } else {
      throw new HTTP401Error();
    }
  } else {
    throw new HTTP401Error();
  }
};

export default auth;
