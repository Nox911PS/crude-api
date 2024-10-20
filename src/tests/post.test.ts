import { createServer } from 'node:http';
import { serverRouter } from '../router';
import { sendRequest } from './helpers';
import { IncomingMessage, Server, ServerResponse } from 'node:http';
import { getAllUsers } from '../database/users';
import { defaultUser } from './mocks/user';
import {
  BASE_URL,
  MISSING_REQUIRED_FIELDS_TEXT,
  NON_EXISTING_URL_TEXT,
  REQUEST_METHOD_TYPE,
} from '../constants/constants';

const PORT = 3002;

describe('POST', () => {
  let testServer: Server<typeof IncomingMessage, typeof ServerResponse>;

  beforeAll((done) => {
    testServer = createServer(serverRouter);
    testServer.listen(PORT, done);
  });

  afterAll((done) => {
    testServer.close(done);
  });

  it('should create new user and return it in the response', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `${BASE_URL}`,
      method: REQUEST_METHOD_TYPE.POST,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    expect(getAllUsers().length).toBe(0);

    const response = await sendRequest(options, JSON.stringify(defaultUser));
    const res = response.res;
    const data = JSON.parse(response.data);

    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toEqual('application/json');
    expect(data).toEqual(getAllUsers()[0]);
    expect(getAllUsers().length).toBe(1);
  });

  it('should return 400 and proper message if there are missing required fields or types are not correct', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `${BASE_URL}`,
      method: REQUEST_METHOD_TYPE.POST,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await sendRequest(options, JSON.stringify({ id: 'id' }));
    const res = response.res;
    const data = response.data;

    expect(res.statusCode).toBe(400);
    expect(res.headers['content-type']).toEqual('text/plain');
    expect(data).toEqual(MISSING_REQUIRED_FIELDS_TEXT);
  });

  it('should return 400 and proper message if path is not valid', async () => {
    const options = {
      hostname: 'localhost',
      port: PORT,
      path: `/user`,
      method: REQUEST_METHOD_TYPE.POST,
    };

    const response = await sendRequest(options, JSON.stringify(defaultUser));
    const res = response.res;
    const data = response.data;

    expect(res.statusCode).toBe(404);
    expect(res.headers['content-type']).toEqual('text/plain');
    expect(data).toEqual(NON_EXISTING_URL_TEXT);
  });
});
