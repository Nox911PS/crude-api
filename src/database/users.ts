import { UUID } from 'node:crypto';

export interface User {
  id?: UUID;
  username: string;
  age: number;
  hobbies: string[];
}
const _users: User[] = [];

export const getAllUsers = (): User[] => _users;
export const getUserById = (id: UUID): User | undefined => _users.find((user) => user.id === id);
export const addUser = (user: User): void => {
  _users.push(user);
};

export const updateUser = (user: User): void => {
  const userIndex = _users.findIndex((item) => item.id === user.id);
  _users[userIndex] = user;
};

export const deleteUser = (userId: UUID): void => {
  const userIndex = _users.findIndex((item) => item.id === userId);
  _users.splice(userIndex, 1);
};
