import { NextFunction } from 'express';
import { getRepository } from 'typeorm';
import * as METHODS from 'password-hash';

import { HTTP400Error } from '@utils/errors/httpErrors';
import { resErrorDescCreator } from '@utils/resDescCreator';
import User from '@entity/User';
import { AuthRequest, createTokenKeys } from './types';
import checkBodyForm from '@utils/checkReqFields';

export const checkRequiredFieldsStartSession = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  checkBodyForm(createTokenKeys, req.body);
  next();
};

export const checkDataFromReq = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const login = req.body.login.trim();
  const password = req.body.password.trim();
  if (!login || !password) {
    throw new HTTP400Error(resErrorDescCreator('You must provide all necessery information'));
  } else {
    next();
  }
};

export const checkUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const login = req.body.login.trim();
  const password = req.body.password.trim();

  const existingUser = await getRepository(User)
    .createQueryBuilder('user')
    .where('user.login = :login', { login })
    .getOne();

  if (!existingUser) {
    throw new HTTP400Error(resErrorDescCreator('There is not such user'));
  } else {
    const passwordFromDB = existingUser.password;
    if (!METHODS.verify(password, passwordFromDB)) {
      throw new HTTP400Error(resErrorDescCreator('Password is not valid'));
    } else {
      req.user = {
        id: existingUser.id,
        permissions: existingUser.permissions
      }
      next();
    }
  }
};


