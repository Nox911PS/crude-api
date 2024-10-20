import { createServer } from 'node:http';
import { serverRouter } from './router';

const PORT = 3000;

const server = createServer(serverRouter);

server.listen(PORT, () => {
  console.log(`Start server on ${PORT} port`);
});
