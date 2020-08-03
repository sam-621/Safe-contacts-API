import express from 'express';
import morgan from 'morgan';
import { port } from './config';
import authRoutes from './routes/auth.routes';

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(morgan('dev'));

//ROUTES
app.use('/safecontacts/api/', authRoutes);

//SERVER
app.listen(port, () => console.log('working'));