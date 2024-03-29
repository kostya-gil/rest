import { Response, NextFunction } from 'express';

import checkBodyForm from '@utils/checkReqFields';
import { HTTP400Error } from '@utils/errors/httpErrors';
import { resErrorDescCreator } from '@utils/resDescCreator';
import { bodySectionKeys, SectionRequest } from './types';
import { getSectionById } from './providers/findSections';

export const checkRequiredFieldsForNewSection = (
  req: SectionRequest,
  res: Response,
  next: NextFunction
) => {
  checkBodyForm(bodySectionKeys, req.body);
  next();
};

export const checkDataFromReq = (
  req: SectionRequest,
  res: Response,
  next: NextFunction
) => {
  const name = req.body.name.trim();
  if (!name) {
    throw new HTTP400Error(resErrorDescCreator('You must provide all necessery information'));
  } else {
    next();
  }
};

export const checkExistingSection = async (
  req: SectionRequest,
  res: Response,
  next: NextFunction
) => {
  const sections = await getSectionById(Number(req.params.id));
  if (!sections) {
    throw new HTTP400Error(resErrorDescCreator('This section doesnt exist'));
  } else {
    next();
  }
};
