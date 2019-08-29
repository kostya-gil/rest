import * as METHODS from 'password-hash';
import { getRepository } from 'typeorm';

import { BodyUser } from '../types';
import User, { UserRole } from '@entity/User';

const createUser = async (body: BodyUser, permissions: UserRole) => {
  let { login, password } = body;
  password = password.trim();
  login = login.trim();
  const hashedPassword = METHODS.generate(password);

  const userRepository = await getRepository(User)

  const user = new User();
  user.login = login;
  user.password = hashedPassword;
  if (permissions) {
    user.permissions = permissions;
  }
  await userRepository.save(user);
  return user;
};

export default createUser;
