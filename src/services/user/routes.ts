import { API_URL } from '@config/commonSettings';
import { Response } from 'express';

import * as CHECKS_USER from './checks';
import { UserRole } from '@entity/User';
import createUser from './providers/createUser';
import { UserRequest } from './types';
import resDescCreator, { NameStatus } from '@utils/resDescCreator';

export default [
  {
    path: `${API_URL}user/create/admin`,
    method: 'post',
    handler: [
      CHECKS_USER.checkRequiredFieldsCreateUser,
      CHECKS_USER.checkDataFromReq,
      CHECKS_USER.checkUserForUnique,
      async (req: UserRequest, res: Response) => {
        const user = await createUser(req.body, UserRole.ADMIN);
        const response = resDescCreator(NameStatus.SUCCESS, { name: 'user', payload: { id: user.id, permissions: user.permissions }})
        res.status(200).send(res.json(response));
      } 
    ]
  },
  {
    path: `${API_URL}user/create/editor`,
    method: 'post',
    handler: [
      CHECKS_USER.checkRequiredFieldsCreateUser,
      CHECKS_USER.checkDataFromReq,
      CHECKS_USER.checkUserForUnique,
      async (req: UserRequest, res: Response) => {
        const user = await createUser(req.body, UserRole.SECTION_EDITOR);
        const response = resDescCreator(NameStatus.SUCCESS, { name: 'user', payload: { id: user.id, permissions: user.permissions }})
        res.status(200).send(res.json(response));
      } 
    ]
  },
  {
    path: `${API_URL}user/create/viewer`,
    method: 'post',
    handler: [
      CHECKS_USER.checkRequiredFieldsCreateUser,
      CHECKS_USER.checkDataFromReq,
      CHECKS_USER.checkUserForUnique,
      async (req: UserRequest, res: Response) => {
        const user = await createUser(req.body, UserRole.SECTION_VIEWER);
        const response = resDescCreator(NameStatus.SUCCESS, { name: 'user', payload: { id: user.id, permissions: user.permissions }})
        res.status(200).send(res.json(response));
      } 
    ]
  }
];
