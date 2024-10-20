import { randomUUID } from 'node:crypto';
import { User } from '../../database/users';

export const defaultUser: User = {
  id: randomUUID(),
  username: 'Nox',
  age: 37,
  hobbies: ['nodejs'],
};
