import { Request, Response, NextFunction } from 'express';
import { HTTP403Error } from '@utils/errors/httpErrors';
import { UserData } from '@utils/token';

export interface AuthRequestWithId extends Request {
  user: UserData;
}

const permit = (...allowed: string[]) => {
  const isAllowed = (role: string) => allowed.indexOf(role) > -1;
  return (
    req: AuthRequestWithId,
    res: Response,
    next: NextFunction
  ) => {
    if (req.user && isAllowed(req.user.role))
      next(); 
    else {
      throw new HTTP403Error();
    }
  }
}

export default permit;
