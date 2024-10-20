import { createServer } from 'node:http';
import { serverRouter } from '../router';
import { sendRequest } from './helpers';
import { IncomingMessage, Server, ServerResponse } from 'node:http';
import { addUser, getAllUsers } from '../database/users';
import { defaultUser } from './mocks/user';
import { randomUUID } from 'node:crypto';
import {
  BASE_URL,
  INVALID_USER_ID_TEXT,
  MISSING_USER_TEXT,
  NON_EXISTING_URL_TEXT,
  REQUEST_METHOD_TYPE,
} from '../constants/constants';

const PORT = 3004;

describe('DELETE', () => {
  let testServer: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeAll((done) => {
    testServer = createServer(serverRouter);
    testServer.listen(PORT, done);
  });

  afterAll((done) => {
    testServer.close(done);
  });

  it('should delete user', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `${BASE_URL}/${defaultUser.id}`,
      method: REQUEST_METHOD_TYPE.DELETE,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    addUser(defaultUser);

    expect(getAllUsers()[0]).toEqual(defaultUser);

    const response = await sendRequest(options);
    const res = response.res;
    const data = response.data;

    expect(res.statusCode).toBe(204);
    expect(res.headers['content-type']).toBe(undefined);
    expect(data).toEqual('');
    expect(getAllUsers().length).toBe(0);
  });

  it('should return 404 and proper message if user is not exist', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `${BASE_URL}/${randomUUID()}`,
      method: REQUEST_METHOD_TYPE.DELETE,
    };

    const response = await sendRequest(options);
    const res = response.res;
    const data = response.data;

    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toEqual('text/plain');
    expect(data).toEqual(MISSING_USER_TEXT);
  });

  it('should return 400 and proper message if user id is not valid', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `${BASE_URL}/userId`,
      method: REQUEST_METHOD_TYPE.DELETE,
    };

    const response = await sendRequest(options);
    const res = response.res;
    const data = response.data;

    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toEqual('text/plain');
    expect(data).toEqual(INVALID_USER_ID_TEXT);
  });

  it('should return 400 and proper message if path is not valid', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `/user`,
      method: REQUEST_METHOD_TYPE.DELETE,
    };

    const response = await sendRequest(options);
    const res = response.res;
    const data = response.data;

    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toEqual('text/plain');
    expect(data).toEqual(NON_EXISTING_URL_TEXT);
  });
});
