import { Response, NextFunction, Request } from 'express';
import { HTTPClientError, HTTP404Error } from '@utils/errors/httpErrors';
import { resErrorDescCreator } from '@utils/resDescCreator';

export const notFoundError = () => {
  throw new HTTP404Error(resErrorDescCreator('Method not found'));
};

export const clientError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HTTPClientError) {
    res.status(err.statusCode).send(res.json(JSON.parse(err.message)));
  } else {
    next(err);
  }
};

export const serverError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (process.env.NODE_ENV === 'production') {
    res.status(500).send('Internal Server Error');
  } else {
    res.status(500).send(err.stack);
  }
};
