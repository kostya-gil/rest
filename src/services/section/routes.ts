import { API_URL } from '@config/commonSettings';
import { Response } from 'express';

import * as CHECKS_USER from './checks';
import { createSection, deleteSection, editSection }  from './providers/cudSection';
import { getSections } from './providers/findSections';
import { SectionRequest } from './types';
import resDescCreator, { NameStatus } from '@utils/resDescCreator';
import { UserRole } from '@entity/User';
import auth from '@middleware/auth';
import permit from '@middleware/permissions';

export default [
  {
    path: `${API_URL}sections`,
    method: 'post',
    handler: [
      CHECKS_USER.checkRequiredFieldsForNewSection,
      CHECKS_USER.checkDataFromReq,
      auth,
      permit(UserRole.ADMIN, UserRole.SECTION_EDITOR),
      async (req: SectionRequest, res: Response) => {
        const section = await createSection(req.body);
        const response = resDescCreator(NameStatus.SUCCESS, { name: 'result', payload: section });
        res.status(200).send(res.json(response));
      } 
    ]
  },
  {
    path: `${API_URL}sections/:id`,
    method: 'post',
    handler: [
      CHECKS_USER.checkRequiredFieldsForNewSection,
      CHECKS_USER.checkDataFromReq,
      CHECKS_USER.checkExistingSection,
      auth,
      permit(UserRole.ADMIN, UserRole.SECTION_EDITOR),
      async (req: SectionRequest, res: Response) => {
        const section = await createSection(req.body, req.params.id);
        const response = resDescCreator(NameStatus.SUCCESS, { name: 'result', payload: section });
        res.status(200).send(res.json(response));
      } 
    ]
  },
  {
    path: `${API_URL}sections/:id`,
    method: 'put',
    handler: [
      CHECKS_USER.checkRequiredFieldsForNewSection,
      CHECKS_USER.checkDataFromReq,
      CHECKS_USER.checkExistingSection,
      auth,
      permit(UserRole.ADMIN, UserRole.SECTION_EDITOR),
      async (req: SectionRequest, res: Response) => {
        const section = await editSection(req.body, req.params.id);
        const response = resDescCreator(NameStatus.SUCCESS, { name: 'result', payload: section });
        res.status(200).send(res.json(response));
      } 
    ]
  },
  {
    path: `${API_URL}sections/:id`,
    method: 'delete',
    handler: [
      CHECKS_USER.checkExistingSection,
      auth,
      permit(UserRole.ADMIN, UserRole.SECTION_EDITOR),
      async (req: SectionRequest, res: Response) => {
        await deleteSection(req.params.id);
        const response = resDescCreator(NameStatus.SUCCESS);
        res.status(200).send(res.json(response));
      } 
    ]
  },
  {
    path: `${API_URL}sections`,
    method: 'get',
    handler: [
      auth,
      permit(UserRole.ADMIN, UserRole.SECTION_VIEWER),
      async (req: SectionRequest, res: Response) => {
        const sections = await getSections();
        const response = resDescCreator(NameStatus.SUCCESS, { name: 'tree', payload: sections });
        res.status(200).send(res.json(response));
      } 
    ]
  }
];
