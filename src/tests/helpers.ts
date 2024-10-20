import { IncomingMessage, request, RequestOptions } from 'node:http';

export interface TestServerResponse {
  res: IncomingMessage;
  data: string;
}

export const sendRequest = (options: RequestOptions, postData: string | null = null): Promise<TestServerResponse> =>
  new Promise((resolve, reject) => {
    const req = request(options, (res: IncomingMessage) => {
      let data = '';

      res.on('data', (chunk: Buffer) => {
        data += chunk;
      });

      res.on('end', () => {
        resolve({ res, data });
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(postData);
    }

    req.end();
  });
