import { Request } from 'express';
import { UserRole } from '@entity/User';

interface BodyUser {
  login: string;
  password: string;
}

interface ParamsUser {
  id: number;
  permissions: UserRole;
}

export const createTokenKeys = [
  'login',
  'password'
]

export interface AuthRequest extends Request {
  body: BodyUser;
  user: ParamsUser;
}