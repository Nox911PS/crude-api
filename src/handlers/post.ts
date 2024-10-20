import { IncomingMessage, ServerResponse } from 'node:http';
import { addUser, User } from '../database/users';
import { isPayloadInvalid, sendResponse } from '../helpers/helpers';
import { INTERNAL_ERROR_TEXT, MISSING_REQUIRED_FIELDS_TEXT } from '../constants/constants';
import { randomUUID } from 'node:crypto';

export const addUserHandler = (req: IncomingMessage, res: ServerResponse) => {
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
        id: randomUUID(),
        username,
        age,
        hobbies,
      } as unknown as User;

      addUser(user);

      sendResponse(res, 200, 'application/json', JSON.stringify(user));
    } catch (err) {
      console.error(err);
      sendResponse(res, 500, 'text/plain', INTERNAL_ERROR_TEXT);
    }
  });
};
