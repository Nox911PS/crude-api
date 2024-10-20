import { URL } from 'node:url';
import { IncomingMessage, ServerResponse } from 'node:http';
import { ContentType, StatusCodeType } from '../constants/constants';
import { UUID } from 'node:crypto';

export const parseUrl = (url: string): URL => new URL(`http://${process.env.HOST ?? 'localhost'}${url}`);

export const isPathWithIdValid = (path: string): boolean => Boolean(path.match(/^\/api\/users\/([^/]+)$/));

export const getUserId = (req: IncomingMessage): UUID =>
  parseUrl(req.url || '')
    .pathname.split('/')
    .pop() as UUID;

export const isPayloadInvalid = (username: string, age: number, hobbies: string[]): boolean =>
  !username ||
  !age ||
  !hobbies ||
  typeof username !== 'string' ||
  typeof age !== 'number' ||
  !Array.isArray(hobbies) ||
  !(hobbies as Array<string>).every((hobby) => typeof hobby === 'string');

export const sendResponse = (
  res: ServerResponse,
  statusCode: StatusCodeType,
  contentType?: ContentType,
  data?: unknown,
) => {
  res.statusCode = statusCode;

  if (contentType) {
    res.setHeader('Content-Type', contentType);
  }

  res.end(data);
};
