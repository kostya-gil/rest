import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import checkBodyForm from '@utils/checkReqFields';
import { HTTP400Error } from '@utils/errors/httpErrors';
import { resErrorDescCreator } from '@utils/resDescCreator';
import User from '@entity/User';
import { bodyUserKeys, UserRequest } from './types';

export const checkUserForUnique = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const login = req.body.login;

  const existingUser = await getRepository(User)
    .createQueryBuilder('user')
    .where('user.login = :login', { login })
    .getOne();

  if (existingUser) {
    throw new HTTP400Error(resErrorDescCreator('This email already in used'));
  } else {
    next();
  }
};

export const checkDataFromReq = (
  { body }: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const { password } = body;

  Object.values(body).map(item => {
    if (!item) {
      throw new HTTP400Error(resErrorDescCreator('You must provide all necessery information'));
    }
  });

  if (password.length < 6 || password.length > 128) {
    throw new HTTP400Error(resErrorDescCreator('Password should be between 6 and 128 characters'));
  }
  next();
};

export const checkRequiredFieldsCreateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  checkBodyForm(bodyUserKeys, req.body);
  next();
};