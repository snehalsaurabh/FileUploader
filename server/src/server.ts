import app from './app';
import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const PORT = parseInt(process.env.PORT || '3001', 10);

const server = http.createServer(app);

const startServer = (port: number) => {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use. Trying another port...`);
      startServer(port + 1); // Try the next port
    } else {
      console.error('Server error:', error);
    }
  });
};

startServer(PORT);