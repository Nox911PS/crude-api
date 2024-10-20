import { IncomingMessage, ServerResponse } from 'node:http';
import { getAllUsers, getUserById } from '../database/users';
import { getUserId, isValidUUID, sendResponse } from '../helpers/helpers';
import { INVALID_USER_ID_TEXT, MISSING_USER_TEXT } from '../constants/constants';

export const getAllUsersHandler = (req: IncomingMessage, res: ServerResponse) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(getAllUsers()));
};

export const getUserByIdHandler = (req: IncomingMessage, res: ServerResponse) => {
  const userId = getUserId(req);

  if (userId && isValidUUID(userId)) {
    const user = getUserById(userId);

    if (user) {
      sendResponse(res, 200, 'application/json', JSON.stringify(user));
    } else {
      sendResponse(res, 404, 'text/plain', MISSING_USER_TEXT);
    }
  } else {
    sendResponse(res, 400, 'text/plain', INVALID_USER_ID_TEXT);
  }
};
