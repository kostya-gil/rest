import { Request } from 'express';

export interface BodyUser {
  login: string;
  password: string;
}

export const bodyUserKeys = [
  'login',
  'password'
]

export interface UserRequest extends Request {
  body: BodyUser;
}
