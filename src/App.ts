import express, { Application } from 'express';
import morgan from 'morgan';
import { port } from './config';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

const app: Application = express();

//MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

//ROUTES
app.use('/safecontacts/api/', authRoutes);
app.use('/safecontacts/api/', userRoutes);

//SERVER
app.listen(port, () => console.log('working'));