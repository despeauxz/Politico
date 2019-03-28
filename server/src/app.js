/* eslint-disable no-console */
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import 'babel-polyfill';
import apiRoutes from './routes';
import ErrorHandler from './middlewares/ErrorHandler';

config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.header('Access-Control-Allow-Methods', 'GET, PATCH, POST, DELETE', 'PUT');
  next();
});
app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));


app.use('/api/v1/docs', express.static('server/docs'));

app.use('/api', apiRoutes);
app.use('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page Not Found',
}));


app.use(ErrorHandler.sendError);


app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});

export default app;
