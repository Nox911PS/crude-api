export enum REQUEST_METHOD_TYPE {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

export type ContentType = 'text/plain' | 'application/json';

export type StatusCodeType = 200 | 201 | 204 | 400 | 404 | 500;

export const UUID_VALIDATION_REGEXP = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export const BASE_URL = '/api/users';
export const NON_EXISTING_URL_TEXT = 'Non existing URL. Please check your URL and try again.';
export const INVALID_USER_ID_TEXT = 'User id is invalid. User is should be UUID. Please check user id and try again.';
export const MISSING_USER_TEXT = 'User with this id is missing.  Please check user id and try again.';
export const INTERNAL_ERROR_TEXT = 'Something went wrong. Check the logs to understand the problem.';
export const MISSING_REQUIRED_FIELDS_TEXT =
  'Missing required fields or fields types are wrong. The required fields are username as string, age as number and hobbies as array of strings.';
