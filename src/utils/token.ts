import dotenv from 'dotenv';
import * as JWT from 'jsonwebtoken';

import { HTTP401Error } from './errors/httpErrors';
import { UserRole } from '@entity/User';

dotenv.config();

declare var process : {
  env: {
    SECRET_KEY: string
  }
}

const SECRET_KEY = process.env.SECRET_KEY;
const EXPIRED_ACCES_TOKEN_TIME = 1400;

export const createToken = (id: number, role: string = UserRole.SECTION_VIEWER) => {
  const accessToken = JWT.sign({ id, role },
    SECRET_KEY,
    { expiresIn: EXPIRED_ACCES_TOKEN_TIME }
  );
  return accessToken;
};

export interface UserData {
  flag: boolean;
  role: string;
  id: number;
};

export const  validateToken = (accessToken: string): Promise<UserData> => {
  return new Promise((resolve) => {
    JWT.verify(accessToken, SECRET_KEY, (err: JWT.VerifyErrors, decoded: any) => {
        if (err) {
          throw new HTTP401Error();
        } else {
          const data: UserData = {
            flag: true,
            role: decoded.role,
            id: decoded.id
          }
          resolve(data);
        }
      });
    });
};
