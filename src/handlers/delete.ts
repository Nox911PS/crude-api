import { IncomingMessage, ServerResponse } from 'node:http';
import { deleteUser, getUserById } from '../database/users';
import { getUserId, sendResponse } from '../helpers/helpers';
import { validate } from 'uuid';
import { INVALID_USER_ID_TEXT, MISSING_USER_TEXT } from '../constants/constants';

export const deleteUserByIdHandler = (req: IncomingMessage, res: ServerResponse) => {
  const userId = getUserId(req);

  if (userId && validate(userId)) {
    const user = getUserById(userId);

    if (user) {
      deleteUser(userId);
      sendResponse(res, 204);
    } else {
      sendResponse(res, 404, 'text/plain', MISSING_USER_TEXT);
    }
  } else {
    sendResponse(res, 400, 'text/plain', INVALID_USER_ID_TEXT);
  }
};
