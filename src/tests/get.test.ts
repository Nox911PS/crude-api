import { createServer } from 'node:http';
import { serverRouter } from '../router';
import { sendRequest } from './helpers';
import { IncomingMessage, Server, ServerResponse } from 'node:http';
import { addUser } from '../database/users';
import { defaultUser } from './mocks/user';
import { randomUUID } from 'node:crypto';
import {
  BASE_URL,
  INVALID_USER_ID_TEXT,
  MISSING_USER_TEXT,
  NON_EXISTING_URL_TEXT,
  REQUEST_METHOD_TYPE,
} from '../constants/constants';

const PORT = 3001;

describe('GET', () => {
  let testServer: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeAll((done) => {
    testServer = createServer(serverRouter);
    testServer.listen(PORT, done);

    addUser(defaultUser);
  });

  afterAll((done) => {
    testServer.close(done);
  });

  it('should return all users', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/users',
      method: REQUEST_METHOD_TYPE.GET,
    };

    const response = await sendRequest(options);
    const res = response.res;
    const data = JSON.parse(response.data);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual('application/json');
    expect(data).toEqual([defaultUser]);
  });

  it('should return user by id', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `${BASE_URL}/${defaultUser.id}`,
      method: REQUEST_METHOD_TYPE.GET,
    };

    const response = await sendRequest(options);
    const res = response.res;
    const data = JSON.parse(response.data);

    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toEqual('application/json');
    expect(data).toEqual(defaultUser);
  });

  it('should return 404 and message if user is not exist', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `${BASE_URL}/${randomUUID()}`,
      method: REQUEST_METHOD_TYPE.GET,
    };

    const response = await sendRequest(options);
    const res = response.res;
    const data = response.data;

    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toEqual('text/plain');
    expect(data).toEqual(MISSING_USER_TEXT);
  });

  it('should return 400 and message if user id is not valid', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `${BASE_URL}/userId`,
      method: REQUEST_METHOD_TYPE.GET,
    };

    const response = await sendRequest(options);
    const res = response.res;
    const data = response.data;

    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toEqual('text/plain');
    expect(data).toEqual(INVALID_USER_ID_TEXT);
  });

  it('should return 400 and message if path is not valid', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `/user`,
      method: REQUEST_METHOD_TYPE.GET,
    };

    const response = await sendRequest(options);
    const res = response.res;
    const data = response.data;

    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toEqual('text/plain');
    expect(data).toEqual(NON_EXISTING_URL_TEXT);
  });
});
