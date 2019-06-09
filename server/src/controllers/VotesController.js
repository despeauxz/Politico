import moment from 'moment';
import db from '../models';
import officeModel from '../models/office';

/**
 * @exports
 * @class Votescontroller
 * @extends Controller
 */
class VotesController {
  /**
   * @static
   * @param {*} req
   * @param {*} res
   * @returns { Object }
   * @memberof VotesController
   */
  static async vote(req, res) {
    const { officeId, candidateId } = req.body;
    const voterId = req.user.id;
    const searchText = 'SELECT * FROM candidates WHERE id=$1';
    const { rows } = await db.query(searchText, [candidateId]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'Candidate does not exists',
      });
    }
    const office = await officeModel.findOne(officeId);
    if (office.rows[0].electiondate === null) {
      return res.status(400).json({
        status: 400,
        error: 'Election date hasn\'t been fixed yet',
      });
    }
    if ((new Date(office.rows[0].electiondate) >= new Date())) {
      return res.status(400).json({
        status: 400,
        error: 'Election hasn\'t begun yet',
      });
    }
    const text = 'INSERT INTO votes(officeId, candidateId, voterId, created_at) VALUES ($1, $2, $3, $4) RETURNING officeId, candidateId, voterId';
    try {
      const response = await db.query(text, [officeId, candidateId, voterId, moment(new Date())]);
      return res.status(201).json({
        status: 201,
        message: 'Your vote has been successfuly casted',
        data: response.rows[0],
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

  static async history(req, res) {
    try {
      const userId = req.user.id;
      const query = `SELECT votes.id, votes.created_at, users.firstname as firstname, users.lastname as lastname,
        offices.name as officename, parties.name as partyname, parties.logoUrl as partylogo FROM votes
        JOIN users ON users.id = votes.candidateId
        JOIN parties ON parties.id = votes.candidateId
        JOIN offices ON offices.id = votes.officeId
        WHERE voterId=$1 ORDER BY votes.id DESC`;
      const { rows, rowCount } = await db.query(query, [userId]);
      return res.status(200).json({
        status: 200,
        data: rows,
        rowCount,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default VotesController;
