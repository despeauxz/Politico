import moment from 'moment';
import db from '../models';

/**
 * @exports
 * @class Votescontroller
 * @extends Controller
 */
class VotesController {
    
  static async vote(req, res) {
    const { officeId, candidateId } = req.body;
    const voterId = req.user.id;
    const searchText = 'SELECT * FROM candidates WHERE id=$1';
    const { rows } = await db.query(searchText, [candidateId]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        message: 'Candidate does not exists',
      });
    }
    const text = 'INSERT INTO votes(office_id, candidate_id, voter_id, created_at) VALUES ($1, $2, $3, $4) RETURNING office_id, candidate_id, voter_id';
    try {
      const { rows } = await db.query(text, [officeId, candidateId, voterId, moment(new Date())]);
      return res.status(201).json({
        status: 201,
        message: 'You\'ve successfuly registered',
        data: rows[0],
      });
    } catch (error) {
      if (error.routine === 'ri_ReportViolation') {
        return res.status(404).json({
          status: 404,
          error: 'Office does not exists',
        });
      }
      if (error.routine === '_bt_check_unique') {
        return res.status(409).json({
          status: 409,
          message: 'You cannot vote multiple times',
        });
      }
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default VotesController;
