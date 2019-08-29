import { API_URL } from '@config/commonSettings';
import { Response } from 'express';

import { AuthRequest } from './types';
import * as CHECKS_USER from './checks';
import * as TOKEN_ACTIONS from '@utils/token';
import resDescCreator, { NameStatus } from '@utils/resDescCreator';

export default [
  {
    path: `${API_URL}login`,
    method: 'post',
    handler: [
      CHECKS_USER.checkRequiredFieldsStartSession,
      CHECKS_USER.checkDataFromReq,
      CHECKS_USER.checkUser,
      (req: AuthRequest, res: Response) => {
        const token = TOKEN_ACTIONS.createToken(req.user.id, req.user.permissions);
        const response = resDescCreator(NameStatus.SUCCESS, { name: 'token', payload: token })
        res.status(200).send(res.json(response));
      }
    ]
  },
  {
    path: `${API_URL}logout`,
    method: 'get',
    handler: [
      (req: Request, res: Response) => {
        // Этот метод для нашего случая необязателен, т.к. дотаточно будет со стороны frontend просто удалить токен из storage и сделать там редирект
        //Поидее, я поставил время жизни токена на 30 мин, поэтому как только он истечет, пользователю нужно перелогиниваться, чтобы этого не было, обычно заводят 2 токена,
        // для доступа и 2 долгоживущий, как только один истекает, мы их перевыпускаем новые,
        //но здесь для простоты сделал 1 токен
        // У нас нет возможности удалить JWT как куку, но, например, мы можем сделать blacklist JWT и хранить где-нибудь в редис, 
        //но в большинстве случаев, как показывает практика, можно просто удалять со стороны фронта
        //Если честно, passportJS, если нам  нужна простая авторизация без использования сторонних сервисов только все усложняет, 
        //документация слабоватая, но даже будь мне нужна другая auth, я бы все равно руками написал, потому что, это неочень сложно
        const response = resDescCreator(NameStatus.SUCCESS);
        res.status(200).send(res.json(response));
        //P.S. У ребят тоже был такой метод на бэке и делал ровно тоже самое), просто отправлял успешно и ... все.
      }
    ]
  }
];
