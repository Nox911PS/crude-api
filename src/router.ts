import { IncomingMessage, ServerResponse } from 'node:http';
import { BASE_URL, REQUEST_METHOD_TYPE } from './constants';

import { isPathWithIdValid, parseUrl, sendResponse } from './helpers';

export const serverRouter = (req: IncomingMessage, res: ServerResponse) => {
  const parsedUrl = parseUrl(req.url || '');

  console.log('[SERVER_ROUTER] METHOD:', req.method, 'PATH_NAME:', parsedUrl.pathname);

  switch (req.method) {
    case REQUEST_METHOD_TYPE.GET:
      handleGetRequest(req, res, parsedUrl.pathname);
      break;
    case REQUEST_METHOD_TYPE.POST:
      handlePostRequest(req, res, parsedUrl.pathname);
      break;
    case REQUEST_METHOD_TYPE.PUT:
      handleUpdateRequest(req, res, parsedUrl.pathname);
      break;
    case REQUEST_METHOD_TYPE.DELETE:
      handleDeleteRequest(req, res, parsedUrl.pathname);
      break;
    default:
      sendResponse(res, 404, 'text/plain', `Method ${req.method} is not allowed.`);
  }
};

const handleGetRequest = (req: IncomingMessage, res: ServerResponse, path: string) => {
  if (path === BASE_URL) {
    console.log('[GET ALL] Get all users');
  } else if (isPathWithIdValid(path)) {
    console.log('[GET ID] Get user by Id');
  } else {
    console.log('[GET NOT_FOUND] route not found or invalid route');
  }
};

const handleDeleteRequest = (req: IncomingMessage, res: ServerResponse, path: string) => {
  if (isPathWithIdValid(path)) {
    console.log('[DELETE ID] delete user by Id');
  } else {
    console.log('DELETE NOT_FOUND] route not found or invalid route');
  }
};

const handleUpdateRequest = (req: IncomingMessage, res: ServerResponse, path: string) => {
  if (isPathWithIdValid(path)) {
    console.log('[PUT ID] update user by Id');
  } else {
    console.log('PUT NOT_FOUND] route not found or invalid route');
  }
};

const handlePostRequest = (req: IncomingMessage, res: ServerResponse, path: string) => {
  if (path === BASE_URL) {
    console.log('[POST ID] add user by Id');
  } else {
    console.log('POST NOT_FOUND] route not found or invalid route');
  }
};
