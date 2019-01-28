import express from 'express';
import partyRoutes from './partyRoutes';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to Politico API',
  });
});

apiRoutes.get('/v1', (req, res) => {
  res.json({
    status: 200,
    message: 'Welcome to version 1 of Politico API',
  });
});

apiRoutes.use('/v1/parties', partyRoutes);


export default apiRoutes;
