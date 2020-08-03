import express from 'express';
import morgan from 'morgan';
import { port } from './config';

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('Hello world in typescript :)')
});

app.listen(port, () => console.log('working'));