import express from 'express';
import partyRoutes from './partyRoutes';
import officeRoutes from './officeRoutes';
import votesRoutes from './votes';
import userRoutes from './users';
import electionRoutes from './election';
import petition from './petition';

const apiRoutes = express.Router();

apiRoutes.get('/', (req, res) => res.json({
  status: 200,
  message: 'Welcome to Politico API',
}));

apiRoutes.get('/v1', (req, res) => res.json({
  status: 200,
  message: 'Welcome to version 1 of Politico API',
}));

apiRoutes.use('/v1/parties', partyRoutes);
apiRoutes.use('/v1/offices', officeRoutes);
apiRoutes.use('/v1/auth', userRoutes);
apiRoutes.use('/v1/votes', votesRoutes);
apiRoutes.use('/v1/office', electionRoutes);
apiRoutes.use('/v1/petition', petition);


export default apiRoutes;
