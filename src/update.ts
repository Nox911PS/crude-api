import { IncomingMessage, ServerResponse } from 'node:http';
import { getAllUsers, getUserById, updateUser, User } from './data/users';
import { getUserId, isPayloadInvalid, sendResponse } from './helpers';
import { validate } from 'uuid';
import {
  INTERNAL_ERROR_TEXT,
  INVALID_USER_ID_TEXT,
  MISSING_REQUIRED_FIELDS_TEXT,
  MISSING_USER_TEXT,
} from './constants';

export const getAllUsersHandler = (req: IncomingMessage, res: ServerResponse) => {
  sendResponse(res, 200, 'application/json', JSON.stringify(getAllUsers()));
};

export const updateUserByIdHandler = (req: IncomingMessage, res: ServerResponse) => {
  const userId = getUserId(req);

  if (userId && validate(userId)) {
    const user = getUserById(userId);

    if (user) {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk.toString();
      });

      req.on('end', () => {
        try {
          const { username, age, hobbies } = JSON.parse(body);

          if (isPayloadInvalid(username, age, hobbies)) {
            sendResponse(res, 400, 'text/plain', MISSING_REQUIRED_FIELDS_TEXT);
            return;
          }

          const user = {
            id: userId,
            username,
            age,
            hobbies,
          } as User;

          updateUser(user);
          sendResponse(res, 200, 'application/json', JSON.stringify(user));
        } catch (err) {
          console.error(err);
          sendResponse(res, 500, 'text/plain', INTERNAL_ERROR_TEXT);
        }
      });
    } else {
      sendResponse(res, 404, 'text/plain', MISSING_USER_TEXT);
    }
  } else {
    sendResponse(res, 400, 'text/plain', INVALID_USER_ID_TEXT);
  }
};
