import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import apiRoutes from './routes';
import ErrorHandler from './middlewares/ErrorHandler';
import errors from '../lib/errors.json';

config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(logger('dev'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

app.use('/api', apiRoutes);
app.use('/api/*', (req, res) => {
  res.status(404).json({
    status: 404,
    error: errors[404],
  });
});

app.use(ErrorHandler.sendError);


app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

export default app;
