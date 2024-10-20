import { config } from 'dotenv';
import { createServer } from 'node:http';
import { serverRouter } from './router';

config({ path: `.env.${process.env.NODE_ENV}` });

const PORT = process.env.PORT;

const server = createServer(serverRouter);

server.listen(PORT, () => {
  console.log(`Start server on ${PORT} port`);
});
