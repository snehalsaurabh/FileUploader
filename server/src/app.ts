import 'reflect-metadata';
import express from 'express';
import fileRoutes from './routes/fileRoutes';
import { AppDataSource } from './data-source';

const app = express();

AppDataSource.initialize().then(() => {
  app.use(express.json());
  app.use('/api/files', fileRoutes);

  console.log('Data Source has been initialized!');
}).catch((error) => {
  console.error('Error during Data Source initialization:', error);
});

export default app;